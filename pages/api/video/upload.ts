// uses code from
// https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430
// https://stackoverflow.com/a/62547135
import multer from "multer";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Query } from "../Types";
import nextConnect from "next-connect";
import path from "path";
import fs from "fs/promises";
import ffprobeStatic from "ffprobe-static";
import { Server, Socket } from "socket.io";
import ffprobe from "ffprobe";
import ffmpegStatic from "ffmpeg-static";
import Fessonia from "@tedconf/fessonia";
import extractFrames from "ffmpeg-extract-frames";

import { addVideo } from "../../../Database/video/add";
import { updateVideo } from "../../../Database/video/update";
import { addResolution } from "../../../Database/resolutions/add";
import { updateResolution } from "../../../Database/resolutions/update";
import { uploadImage } from "../image/upload";

// for now we will only use resolutions of 1080p and down, while 4K is fun and all
// the time taken to export a video in those higher resolutions can be harsh
// in the future to add support for those higher resolutions all that needs to
// happens is add in the height of the resolution
// const resolutions = [144, 240, 360, 480, 720, 1080]
const resolutions = [480, 720];

const clients: { [x: string]: Socket } = {};

const ffmpeg = Fessonia({
  ffmpeg_bin: ffmpegStatic,
  ffprobe_bin: ffprobeStatic.path
});

class Pool {
  tasks: { fn: (...args: any) => Promise<any> }[];
  activeTasks: any[];
  workers: number;
  activeWorkers: number;
  active: boolean;

  constructor() {
    this.tasks = [];
    this.activeTasks = [];
    this.workers = 1;
    this.activeWorkers = this.activeTasks.length;
    this.active = false;
  }

  addTask = (fn: any) => {
    this.tasks.push({ fn });
  };

  start = () => {
    this.active = true;
    if (this.activeWorkers < this.workers) {
      const task = this.tasks.shift();

      if (task) {
        this.activeWorkers++;
        this.activeTasks.push(
          new Promise((resolve, reject) => {
            task
              .fn()
              .then(resolve)
              .catch(reject)
              .finally(() => {
                this.activeTasks.pop();
                this.activeWorkers--;
                if (this.active) {
                  this.start();
                }
              });
          })
        );
      }
    }
  };

  stop = () => {
    this.active = false;
  };
}

const videoPool = new Pool();

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
});

const IngestDir = path.join(process.cwd(), `./storage/videos/ingest`);

const ramUploadSpace = multer({ dest: IngestDir });
const uploadMiddleWare = ramUploadSpace.single("file");

interface File {
  fieldname: "file";
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

const handler = async (req, res) => {
  const { userId, videoName } = req.query as Query;

  if (userId && videoName) {
    const file: File = req.file;
    const fileIn = file.path;

    // this api is for only uploading videos, the mimetype must start with video
    if (file.mimetype.split("/")[0] !== "video") {
      res.status(400).json({ error: "wrong mimetype" });
      return;
    }

    const { videoId } = await addVideo({
      userId,
      videoName,
      access: "private"
    });

    console.log(`video`, videoId, fileIn, file, userId);

    await processNewVideo({ videoId, fileIn });

    res.status(200).json({ videoId });
  }

  // this chunk of code starts a socket-io server to communicate with the
  // client the current state of the video as it gets processed
  // the code is from https://stackoverflow.com/a/62547135
  // the general gist of things is that this code block is only ever
  // run once, only when this handler is called for the first time
  // the if statement checks if a socket-io server is running
  // if not it creates a new one, then the .on() methods are defined
  // lastly io server is set to the res so the server doesn't get created again
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      socket.on("video", (videoId) => {
        // a clients object is global to this function, it uses the videoId
        // to point to a socket object, this is so when a video is being processed
        // above the update, start, and error can be communicated to the client

        clients[videoId] = socket;
      });
    });

    res.socket.server.io = io;
  }

  if (!res.finished) {
    res.end();
  }
};

// Process a POST request
apiRoute.use(uploadMiddleWare).post(handler);

export default apiRoute;

export const config = {
  api: {
    bodyParser: false // Disallow body parsing, consume as stream
  }
};

interface ResizeVideoToFile {
  videoId: string;
  fileIn: string;
  videoDir: string;
  fileType: string;
  width: string;
  height: string;
  resolutionId: string;
  frames: number;
  index: number;
  totalNumOfVideos: number;
}

async function resizeVideoToFile({
  videoId,
  fileIn,
  videoDir,
  fileType,
  width,
  height,
  resolutionId,
  frames,
  index,
  totalNumOfVideos
}: ResizeVideoToFile): Promise<void> {
  return new Promise(async (resolve, reject) => {
    // from ingest we want to create a copy of the video in .webm and .mp4 in the
    // range of the resolutions we generated above
    // then the video can be deleted from ingest
    await updateResolution({ resolutionId, status: "PROCESSING" });

    // this object has five classes, Fessonia is an object oriented package so everything is a class
    // FFmpegCommand is the starting point, FFmpegInput is used to add source files to the videoObject
    // FFmpeg is for defining where the output file goes and in what format, FilterNode is an object
    // that applies a filter, in this case we will just use it to resize the video
    // Filter chain is an array of filterNodes, it will apply the filters in the order defined
    const { FFmpegCommand, FFmpegInput, FFmpegOutput, FilterNode, FilterChain } = ffmpeg;

    // create the new FFmpeg Object
    const video = new FFmpegCommand();

    // create a scale filter and add it to a chain
    const scaleFilter = new FilterNode("scale", [width, height]);
    const filterChain = new FilterChain([scaleFilter]);

    // add the input file
    video.addInput(new FFmpegInput(fileIn));

    // apply the filter
    video.addFilterChain(filterChain);

    const fileOut = videoDir + `${height}${fileType}`;

    // define the output
    video.addOutput(new FFmpegOutput(fileOut));

    video.on("update", (data) => {
      console.log(videoId, "update", { height, width }, `frame:`, data.frame);
      const percentage = Math.floor((data.frame / frames) * 100);
      clients[videoId]?.emit(videoId, {
        event: "update",
        videoId,
        height,
        width,
        data,
        frames,
        percentage,
        index,
        totalNumOfVideos,
        totalPercentage: Math.floor(((index + 1) / totalNumOfVideos) * 100)
      });
      // handle the update here
    });

    video.on("success", async (data) => {
      console.log(videoId, "success", { height, width }, `frame:`, data.frame);
      clients[videoId]?.emit(videoId, {
        event: "success",
        videoId,
        height,
        width,
        data
      });
      await updateResolution({ resolutionId, status: "DONE" });
      resolve();
      // handle the success here
    });

    video.on("error", async (err) => {
      // inspect and handle the error here
      console.log(videoId, "error", { height, width }, err);
      clients[videoId]?.emit(videoId, {
        event: "error",
        videoId,
        height,
        width,
        error: err
      });
      await updateResolution({ resolutionId, status: "ERROR" });
      await fs.rm(fileOut);
      reject(err.message);
    });

    // there is two methods to start this process, video.execute() and video.spawn()
    // execute is a simpler method that returns a promise, but the on() listeners do not fire
    // so here I am using spawn so the update listen is called to watch the progress
    video.spawn();

    // console.log({
    //   aspectRatio,
    //   allVideoResolutions,
    //   masterVideoPixelCount,
    //   selectedVideoResolutions,
    // });
  });
}

const calcAspectRatio = (ratio: string) => {
  const [first, second] = ratio.split(":");
  return parseInt(first) / parseInt(second);
};

// this function takes the path of a video and the id of the video in the database
// it uses a module that uses ffmpeg to grab the first frame in the video
// then by calling a function it uploads that image to storage and saves the
// imageId to the video in the database
// this thumbnail is used both for the cover of the video and to display
// while the video loads
const setFirstFrameToThumbnail = async (videoPath: string, videoId: string) => {
  // create a tmp directory in /tmp
  const tmpPath = await fs.mkdtemp("/tmp/");
  const tmpImage = tmpPath + "/thumbnail.png";

  // this function saves the first frame in the video to the tmp image dir
  await extractFrames({
    input: videoPath,
    output: tmpImage,
    offsets: [1],
    numFrames: 1,
    ffmpegPath: ffmpegStatic
  });

  // read the image from the file system
  const thumbnail = await fs.readFile(tmpImage);

  // upload the image to storage and update the video details
  const { imageId } = await uploadImage(thumbnail, { type: "thumbnail", videoId, userId: null });

  // remove the tmp dir
  await fs.rm(tmpPath, { recursive: true, force: true });

  return { imageId };
};

export async function processNewVideo({
  videoId,
  fileIn: fileDir
}: {
  videoId: string;
  fileIn: string;
}): Promise<void> {
  const videoDir = path.join(process.cwd(), `./storage/videos/${videoId}/`);
  await fs.mkdir(videoDir, { recursive: true });

  // ffprobe is a tool that looks into videos to get a bunch of information
  // the tool returns an object called streams, it is a list
  // a video file contains both a video and an audio stream
  // for now I will just assume that the first item is the video and the second is audio
  // as i test the system with more data i may find this this changes from video to video
  // in which case i will need to look at the properties of the stream to figure out what it is
  const { streams } = await ffprobe(fileDir, { path: ffprobeStatic.path });
  const [videoDetails, audioDetails] = streams;
  console.log({streams});

  const framesString = videoDetails.nb_frames as unknown as string;
  const frames = parseInt(framesString);

  // we need the aspect ratio of the video to generate different formats of the video
  // the format will generally be "16:9", this is great but we need this in a number
  // the computer can understand, so we divided 16 / 9 to get 1.7777, this can be times
  // by the height of the video we want to maintain aspect ratio
  const aspectRatio = calcAspectRatio(
    videoDetails.display_aspect_ratio || `${videoDetails.width}:${videoDetails.height}`
  );

  const isVerticalVideo = videoDetails.tags.rotate === "90";

  const allVideoResolutions = resolutions.map((standardRes) => {
    let width: number;
    let height: number;

    if (isVerticalVideo) {
      width = standardRes;
      height = Math.floor(aspectRatio * standardRes);
    } else {
      width = Math.floor(aspectRatio * standardRes);
      height = standardRes;
    }

    const pixels = width * standardRes;
    return { width, height, pixels };
  });

  // this simply is the number of pixels in the original video file uploaded
  const masterVideoPixelCount = videoDetails.height * videoDetails.width;

  // by comparing how large the number of pixels we can remove the larger sizes
  const selectedVideoResolutions = allVideoResolutions.filter(({ pixels }) => pixels <= masterVideoPixelCount);

  const videoFormats = [".webm", ".mp4"];

  console.log({ selectedVideoResolutions });

  // at this point we have collected and generated all the data needed to process the video
  await setFirstFrameToThumbnail(fileDir, videoId);

  if (videoDetails.duration) {
    const duration = videoDetails.duration as unknown as string;
    const length = Math.floor(parseFloat(duration) * 1000);
    await updateVideo({ videoId, newVideo: { length } });
  }

  let numOfVideos = 0;
  const totalNumOfVideos = selectedVideoResolutions.length * videoFormats.length;

  selectedVideoResolutions.map(({ width, height }, index1) => {
    videoFormats.map(async (fileType, index2) => {
      // create a table to store each different resolution and file type for a video
      const { resolutionId } = await addResolution({
        videoId,
        height: height.toString(),
        width: width.toString(),
        fileType
      });

      const index = numOfVideos;

      // add the function to the pool to be processed
      videoPool.addTask(() =>
        resizeVideoToFile({
          videoId,
          fileIn: fileDir,
          videoDir,
          fileType,
          width: width.toString(),
          height: height.toString(),
          resolutionId,
          frames,
          index,
          totalNumOfVideos
        })
      );

      videoPool.start();

      numOfVideos++;
    });
  });
}
