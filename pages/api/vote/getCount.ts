import type { NextApiRequest, NextApiResponse } from 'next'
import { getVoteCount } from "../../../Database/vote/getCount"

export default async function getVoteHandler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(await getVoteCount(req.query as any))
}