import type { NextApiRequest, NextApiResponse } from 'next'
import type { Query } from "../../Types"
import { getUser } from "../../../../Database/user/get"

export default async function getUserQuery(req: NextApiRequest, res: NextApiResponse) {

  const { id: userId } = req.query as Query;

  res.status(200).json(await getUser({ userId }))
}