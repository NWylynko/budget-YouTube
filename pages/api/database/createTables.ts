import { createTables } from "../../../Database/tools/createTables"

export default async function handler(req, res) {

  await createTables()

  res.status(200).json({ done: "success" })
}