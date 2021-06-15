import type { NextApiRequest, NextApiResponse } from 'next'
import { createTables } from "../../../Database/tools/createTables"

export default async function(req: NextApiRequest, res: NextApiResponse) {

  await createTables()

  res.status(200).json({ done: "success" })
}