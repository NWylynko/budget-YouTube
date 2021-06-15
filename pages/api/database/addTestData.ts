import { addTestData } from "../../../Database/tools/addTestData"

export default async function handler(req, res) {

  await addTestData()

  res.status(200).json({ done: "success" })
}