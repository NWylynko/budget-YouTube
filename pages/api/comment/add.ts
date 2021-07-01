import type { NextApiRequest, NextApiResponse } from 'next'
import { addComment } from "../../../Database/comment/add"

interface Body {
  [x: string]: any;
}

export default async function addCommentHandler(req: NextApiRequest, res: NextApiResponse) {

  const { videoId, userId, comment } = req.body as Body;

  res.status(200).json(await addComment({videoId, userId, message: comment}))
}