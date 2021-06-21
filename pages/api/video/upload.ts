// based off the guide at https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430
import multer from "multer";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import path from "path";
import fs from "fs/promises";
import { v4 as uuid } from "uuid";
import Axios from "axios";

import { addVideo } from "../../../Database/video/add"

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
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

interface Query {
  [x: string]: string;
}

const handler = async (req, res: NextApiResponse) => {


  const file: File = req.file;
  const { userId, videoName } = req.query as Query;

  // this api is for only uploading videos, the mimetype must start with video
  if (file.mimetype.split("/")[0] !== "video") {
    res.status(400).json({ error: "wrong mimetype" });
    return;
  }

  const { videoId } = await addVideo({ userId, videoName, access: "private" })

  const videoDir = path.join(process.cwd(), `./storage/videos/${videoId}/`);
  await fs.mkdir(videoDir, { recursive: true });

  console.log(`video`, videoId, videoDir, file, userId);

  await Axios.post(
    `http://localhost:3000/api/video/process?videoId=${videoId}&fileIn=${file.path}&videoDir=${videoDir}`
  );

  res.status(200).json({ videoId });
};

// Process a POST request
apiRoute.use(uploadMiddleWare).post(handler);

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
