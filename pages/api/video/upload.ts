// based off the guide at https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430
import multer from 'multer';
import type { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from "next-connect";


const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// cant use ram cuz video files are largeeee
const ramUploadSpace = multer({ storage: multer.memoryStorage() });
const uploadMiddleWare = ramUploadSpace.single('file')

const handler = (req, res: NextApiResponse) => {
  console.log(req.file)
  res.status(200).json({ done: 'success' });
}

// Process a POST request
apiRoute
  .use(uploadMiddleWare)
  .post(handler);

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};