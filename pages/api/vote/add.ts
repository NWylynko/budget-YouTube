import type { NextApiRequest, NextApiResponse } from 'next'
import { addVote } from "../../../Database/vote/add"

export default async function addVoteHandler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(await addVote(req.body))
}