import { reset } from "../../../Database/tools/reset"

export default async function handler(req, res) {

  await reset()

  res.status(200).json({ done: "success" })
}