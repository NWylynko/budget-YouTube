// based off the guide at https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430
import multer from "multer";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import path from "path";
import fs from "fs/promises";
import { v4 as uuid } from "uuid";
import Axios from "axios";

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

const handler = async (req, res: NextApiResponse) => {
  const file: File = req.file;
  const videoId = uuid();
  const videoDir = path.join(process.cwd(), `./storage/videos/${videoId}/`);
  await fs.mkdir(videoDir, { recursive: true });

  console.log(`video`, videoId, videoDir, file);

  // this api is for only uploading videos, the mimetype must start with video
  if (file.mimetype.split("/")[0] !== "video") {
    res.status(400).json({ error: "wrong mimetype" });
    return;
  }

  Axios.post(
    "http://localhost:3000/api/video/process",
    {},
    {
      params: { videoId, fileIn: file.path, videoDir, height: 360, width: 640 },
    }
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
