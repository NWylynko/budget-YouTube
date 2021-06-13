import { createTables } from "../../../Database/tools/createTables"

export default async function handler(req, res) {
  res.status(200).json(await createTables())
}