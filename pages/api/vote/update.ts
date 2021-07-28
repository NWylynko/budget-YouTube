import type { NextApiRequest, NextApiResponse } from 'next'
import { updateVote } from "../../../Database/vote/update"

export default async function updateVoteHandler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(await updateVote(req.body))
}