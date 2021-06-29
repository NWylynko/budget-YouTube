import type { NextApiRequest, NextApiResponse } from 'next'
import { dropTables } from "../../../Database/tools/dropTables"

export default async function dropTablesHandler(req: NextApiRequest, res: NextApiResponse) {

  await dropTables()

  res.status(200).json({ done: "success" })
}