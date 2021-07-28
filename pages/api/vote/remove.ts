import type { NextApiRequest, NextApiResponse } from 'next'
import { removeVote } from "../../../Database/vote/remove"

export default async function removeVoteHandler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(await removeVote(req.body))
}