import type { NextApiRequest, NextApiResponse } from 'next'
import { reset } from "../../../Database/tools/reset"

export default async function resetHandler(req: NextApiRequest, res: NextApiResponse) {

  await reset()

  res.status(200).json({ done: "success" })
}