import type { NextApiRequest, NextApiResponse } from 'next'
import sharp, { AvailableFormatInfo, FormatEnum } from "sharp";
import { v4 as uuid } from "uuid";
import fs from "fs/promises";
import path from "path";

interface Query {
  [x: string]: any;
  format: keyof FormatEnum | AvailableFormatInfo
}

export default async function(req: NextApiRequest, res: NextApiResponse) {

  const { imageId, height, width, format } = req.query as Query

  if (!["heic", "heif", "avif", "jpeg", "jpg", "png", "raw", "tiff", "webp", "gif"].includes(format as string)) {
    res.status(415).send({ error: "image format not accepted" })
  }

  const imagePath = path.join(process.cwd(), `./storage/images/profilePic/${imageId}/${width}x${height}.${format}`);
  const masterImagePath = path.join(process.cwd(), `./storage/images/profilePic/${imageId}/master.webp`);

  try {
    await fs.access(masterImagePath) // throws error if image doesn't exists
    

    try {
      await fs.access(imagePath) // throws error if image doesn't exists
  
      const imageBuffer = await fs.readFile(imagePath)

      console.log(imageBuffer)
  
      res.setHeader('Content-Type',`image/${format}`)
      res.send(imageBuffer)
      return;
  
    } catch (error) {
  
      const imageSharp = sharp(masterImagePath)
        .resize(parseInt(width), parseInt(height))
        .toFormat(format)
  
      await imageSharp.toFile(imagePath);
  
      const imageBuffer = await imageSharp.toBuffer({ resolveWithObject: false });
  
      console.log(imageBuffer)

      res.setHeader('Content-Type',`image/${format}`)
      res.send(imageBuffer)
      return;
    }

  } catch (error) {
    res.status(404).send({ error: "image not found" })
  }


  // const master = sharp(image.buffer)


  // res.status(200).json({ done: "success" })
}