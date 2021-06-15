import { dropTables } from "../../../Database/tools/dropTables"

export default async function handler(req, res) {

  await dropTables()

  res.status(200).json({ done: "success" })
}