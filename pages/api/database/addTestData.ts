import type { NextApiRequest, NextApiResponse } from 'next'
import { addTestData } from "../../../Database/tools/addTestData"

export default async function addTestDataHandler(req: NextApiRequest, res: NextApiResponse) {

  await addTestData()

  res.status(200).json({ done: "success" })
}