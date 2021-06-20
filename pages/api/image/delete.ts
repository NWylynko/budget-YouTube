
import path from 'path';
import fs from 'fs/promises';


export const deleteImage = async (imageId: string) => {

  const imagePath = path.join(process.cwd(), `./storage/images/${imageId}/`);

  await fs.rmdir(imagePath)

  return { imageId }
}