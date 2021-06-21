// code from
// https://dev.to/abdisalan_js/how-to-code-a-video-streaming-server-using-nodejs-2o0
import type { NextApiRequest, NextApiResponse } from "next";
import type { Query } from "../Types"
import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";
import mime from "mime-types";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { videoId, height, fileType } = req.query as Query;

  if (!videoId || !height || !fileType) {
    res.status(400).send("missing query items");
  }

  const { range } = req.headers;

  if (!range) {
    res.status(400).send("Requires Range header");
  }

  console.log({ videoId, height, fileType, range })

  const videoPath = path.join(
    process.cwd(),
    `./storage/videos/${videoId}/${height}.${fileType}`
  );

  try {
    await fsPromises.access(videoPath); // throws error if master image doesn't exists

    // get video stats
    const { size: videoSize } = await fsPromises.stat(videoPath);

    const { start, end } = generateStartAndEnd(range, videoSize);

    // Create headers
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": mime.contentType(`video.${fileType}`) || "application/octet-stream",
    };

    res.writeHead(206, headers);

    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });

    // Stream the video chunk to the client
    videoStream.pipe(res);

    return;
  } catch (error) {
    res.status(404).send({ error: "image not found" });
  }
}

const generateStartAndEnd = (range: string, videoSize: number) => {
  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  return { start, end };
};
