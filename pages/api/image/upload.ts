// based off the guide at https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430
// image processing from https://github.com/NWylynko/PUMPED-api/blob/master/src/api/image/addImage.ts
import multer from "multer";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import sharp from "sharp";
import { v4 as uuid } from "uuid";
import fs from "fs/promises";
import path from "path";
import { updateUser } from '../../../Database/user/update';
import { updateVideo } from '../../../Database/video/update';

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const ramUploadSpace = multer({ storage: multer.memoryStorage() });
const uploadMiddleWare = ramUploadSpace.single("file");

const handler = async (req, res: NextApiResponse) => {
  const { userId, videoId, type } = req.query;

  // user to update the users profile pic (needs userId)
  // thumbnail to update video thumbnail pic (needs videoId)
  // none to do neither, useful to upload image before creating account or video
  if (!["user", "thumbnail", "none"].includes(type)) {
    res.status(415).send({ error: "type wrong or not supplied" });
  }

  const imageBuffer = req.file.buffer;

  try {
    const { imageId } = await uploadImage(imageBuffer, { type, videoId, userId });
    res.status(200).json({ imageId });
    return;
  } catch (error) {
    res.status(500).send({ error });
    return;
  }
};

// Process a POST request
apiRoute.use(uploadMiddleWare).post(handler);

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

type ImageOptions = ({
  type: "user";
  userId: string;
  videoId: null;
} | {
  type: "thumbnail";
  videoId: string;
  userId: null;
} | {
  type: "none",
  videoId: null;
  userId: null;
})

export const uploadImage = async (imageBuffer: Buffer, {type, videoId, userId}: ImageOptions) => {
  const imageId = uuid();

  // convert image to webp
  const master = sharp(imageBuffer).toFormat("webp").webp();

  // define directory for image
  const dir = path.join(
    process.cwd(),
    `./storage/images/${imageId}`
  );

  try {
    // make image directory
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    console.error(error);
    throw new Error("failed to make directory");
    return;
  }

  try {
    // save master file
    await master.toFile(`${dir}/master.webp`);
  } catch (error) {
    console.error(error);
    throw new Error("failed to save master file");
    return;
  }

  if (type === "user") {
    await updateUser({ userId, profilePicId: imageId })
  } else if (type === "thumbnail") {
    await updateVideo({ videoId, newVideo: { thumbnailId: imageId }})
  }

  return { imageId }
};
