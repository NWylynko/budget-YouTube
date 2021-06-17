// based off the guide at https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430
// image processing from https://github.com/NWylynko/PUMPED-api/blob/master/src/api/image/addImage.ts
import multer from "multer";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import sharp from "sharp";
import { v4 as uuid } from "uuid";
import fs from "fs/promises";
import path from "path";

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// cant use ram cuz video files are largeeee
const ramUploadSpace = multer({ storage: multer.memoryStorage() });
const uploadMiddleWare = ramUploadSpace.single("file");

const handler = async (req, res: NextApiResponse) => {
  console.log(req.file);

  const { userId } = req.query;

  console.log({ userId });

  const image = req.file;
  const imageId = uuid();

  console.log("convert image to webp");

  // convert image to webp
  const master = sharp(image.buffer).toFormat("webp").webp();

  console.log("define directory for image");

  // define directory for image
  const dir = path.join(process.cwd(), `./storage/images/profilePic/${imageId}`);

  console.log("make image directory", dir);

  // make image directory
  await fs.mkdir(dir, { recursive: true });

  console.log("save master file");

  try {
    // save master file
    await master.toFile(`${dir}/master.webp`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to save master file" });
    return;
  }

  console.log("return imageId", imageId);

  res.status(200).json({ imageId });
};

// Process a POST request
apiRoute.use(uploadMiddleWare).post(handler);

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
