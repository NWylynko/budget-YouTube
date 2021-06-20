import ffprobeStatic from "ffprobe-static";
import ffmpegStatic from "ffmpeg-static";
import Fessonia from "@tedconf/fessonia";
import { Server, Socket } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";
import ffprobe from "ffprobe";

const fessonia = Fessonia({
  ffmpeg_bin: ffmpegStatic,
  ffprobe_bin: ffprobeStatic.path,
});

const clients: { [x: string]: Socket } = {};

interface Query {
  [x: string]: string;
}

const handler = async (req: NextApiRequest, res) => {
  const { videoId, fileIn, videoDir, height, width } = req.query as Query;

  console.log(req.query);

  if (videoId && fileIn && videoDir && height && width) {
    // ffprobe is a tool that looks into videos to get a bunch of information
    // the tool returns an object called streams, it is a list
    // a video file contains both a video and an audio stream
    // for now I will just assume that the first item is the video and the second is audio
    // as i test the system with more data i may find this this changes from video to video
    // in which case i will need to look at the properties of the stream to figure out what it is
    const { streams } = await ffprobe(fileIn, { path: ffprobeStatic.path });
    const [videoDetails, audioDetails] = streams;
    // console.log(streams);

    // we need the aspect ratio of the video to generate different formats of the video
    // the format will generally be "16:9", this is great but we need this in a number
    // the computer can understand, so we divided 16 / 9 to get 1.7777, this can be times
    // by the height of the video we want to maintain aspect ratio
    const aspectRatio = calcAspectRatio(videoDetails.display_aspect_ratio);

    // for now we will only use resolutions of 1080p and down, while 4K is fun and all
    // the time taken to export a video in those higher resolutions can be harsh
    // in the future to add support for those higher resolutions all that needs to
    // happens is add in the height of the resolution
    const allVideoResolutions = [144, 240, 360, 480, 720, 1080].map(
      (height) => {
        const width = Math.floor(aspectRatio * height);
        const pixels = width * height;
        return { width, height, pixels };
      }
    );

    // this simply is the number of pixels in the original video file uploaded
    const masterVideoPixelCount = videoDetails.height * videoDetails.width;

    // by comparing how large the number of pixels we can remove the larger sizes
    const selectedVideoResolutions = allVideoResolutions.filter(
      ({ pixels }) => pixels <= masterVideoPixelCount
    );

    // at this point we have collected and generated all the data needed to process the video

    // from ingest we want to create a copy of the video in .webm and .mp4 in the
    // range of the resolutions we generated above
    // then the video can be deleted from ingest

    // at the top of the file we created this fessonia object, we don't want to recreate the
    // object on every request so you will have to go back up there to find out how we created it
    // this object has five classes, fessonia is an object oriented package so everything is a class
    // FFmpegCommand is the starting point, FFmpegInput is used to add source files to the videoObject
    // FFmpeg is for defining where the output file goes and in what format, FilterNode is an object
    // that applies a filter, in this case we will just use it to resize the video
    // Filter chain is an array of filterNodes, it will apply the filters in the order defined
    const {
      FFmpegCommand,
      FFmpegInput,
      FFmpegOutput,
      FilterNode,
      FilterChain,
    } = fessonia;

    // create the new FFmpeg Object
    const video = new FFmpegCommand();

    // create a scale filter and add it to a chain
    const scaleFilter = new FilterNode("scale", [width, height]);
    const filterChain = new FilterChain([scaleFilter]);

    // add the input file
    video.addInput(new FFmpegInput(fileIn));

    // apply the filter
    video.addFilterChain(filterChain);
    // define the output
    video.addOutput(new FFmpegOutput(videoDir + `${height}.mp4`));

    video.on("update", (data) => {
      console.log(`frame:`, data);
      clients[videoId]?.emit(videoId, `frame: ${data.frame}`);
      // handle the update here
    });

    video.on("success", (data) => {
      clients[videoId]?.emit(
        videoId,
        `Completed successfully with exit code ${data.exitCode}`
      );
      // handle the success here
    });

    video.on("error", (err) => {
      clients[videoId]?.emit(videoId, err.message);
      // inspect and handle the error here
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
  }

  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      socket.on("video", (videoId) => {
        clients[videoId] = socket;
      });
    });

    res.socket.server.io = io;
  }

  if (!res.finished) {
    res.end();
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};

const calcAspectRatio = (ratio: string) => {
  const [first, second] = ratio.split(":");
  return parseInt(first) / parseInt(second);
};
