import type { NextApiRequest, NextApiResponse } from 'next'
import sharp, { AvailableFormatInfo, FormatEnum } from "sharp";
import fs from "fs/promises";
import path from "path";

interface Query {
  [x: string]: any;
  format: keyof FormatEnum | AvailableFormatInfo
}

// this handler is not your everyday image request handler
// it can do two functions
// the first (faster) function is what you'd expect
// it takes the query, finds the image that matches those query parameters
// and returns it to the client.
// the second (more fun) part of this handler generates on the fly an image 
// that matches the query parameters from the master image. 
// along the way it saves the generated file to the file system, 
// meaning future requests can be faster.
// the first function (reading from storage) takes around 50ms on localhost for a low resolution picture
// the second function (generating on the fly) takes around 100ms to 200ms for the same resolution

// you might wonder why?
// why would you want render on the fly?
// well it allows the client side to request whatever resolution it wants.
// while we could generate different resolutions when an image is uploaded
// but this requires the upload function to predict what resolutions will be needed in the future
export default async function(req: NextApiRequest, res: NextApiResponse) {

  const { imageId, height, width, format } = req.query as Query

  // sharp only supports these formats
  if (!["heic", "heif", "avif", "jpeg", "jpg", "png", "raw", "tiff", "webp", "gif"].includes(format as string)) {
    res.status(415).send({ error: "image format not accepted" })
    return;
  }

  // we have both the path where the image should be
  const imagePath = path.join(process.cwd(), `./storage/images/${imageId}/${width}x${height}.${format}`);
  // and the path to the master image
  const masterImagePath = path.join(process.cwd(), `./storage/images/${imageId}/master.webp`);

  try {
    await fs.access(masterImagePath) // throws error if master image doesn't exists
    

    try {
      await fs.access(imagePath) // throws error if custom image doesn't exists
  
      // read the file from storage
      const imageBuffer = await fs.readFile(imagePath)
  
      // send the file to the client
      res.setHeader('Content-Type',`image/${format}`)
      res.send(imageBuffer)
      return;
  
    } catch (error) {
  
      // create a sharp object, all it needs is the path of the master image
      // then apply the requests params
      const imageSharp = sharp(masterImagePath)
        .resize(parseInt(width), parseInt(height))
        .toFormat(format)
  
      // write the image to file for future requests
      await imageSharp.toFile(imagePath);

      // read the file back from storage to a buffer
      const imageBuffer = await fs.readFile(imagePath)

      // you may ask, why the hell are you reading the file back from filesystem
      // this seems stupid, the image is already in memory just 10 lines up
      // just look at the beautiful function bellow, its got that lovely .toBuffer() method

      // const imageBuffer = await imageSharp.toBuffer({ resolveWithObject: false });

      // so why am i not using it?
      // well it doesn't work.
      // even though i have passed the object { resolveWithObject: false }, the function
      // stills returns an object, this object doesn't have the image as a buffer or anything
      // so to make this actually work I have to go with the bone hurting method of 
      // writing and reading the same image
  
      // send the file to the client
      res.setHeader('Content-Type',`image/${format}`)
      res.send(imageBuffer)
      return;
    }

  } catch (error) {
    res.status(404).send({ error: "image not found" })
  }

}