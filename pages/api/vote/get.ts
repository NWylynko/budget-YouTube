import type { NextApiRequest, NextApiResponse } from 'next'
import { getVote } from "../../../Database/vote/get"

export default async function getVoteHandler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(await getVote(req.query as any))
}