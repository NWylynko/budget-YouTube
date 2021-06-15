import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllUser } from "../../../Database/user/getAll"

export default async function(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(await getAllUser())
}