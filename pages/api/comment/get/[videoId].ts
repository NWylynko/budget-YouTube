import type { NextApiRequest, NextApiResponse } from 'next'
import type { Query } from "../../Types"
import { getComment } from "../../../../Database/comment/get"

export default async function getCommentsHandler(req: NextApiRequest, res: NextApiResponse) {

  const { videoId } = req.query as Query;

  res.status(200).json(await getComment({ videoId }))
}