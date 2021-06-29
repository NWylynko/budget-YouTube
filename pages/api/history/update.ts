import type { NextApiRequest, NextApiResponse } from 'next'
import { updateHistory } from "../../../Database/history/update"

interface Body {
  [x: string]: any;
}

export default async function updateHistoryHandler(req: NextApiRequest, res: NextApiResponse) {

  const { videoId, userId, watched } = req.body as Body;

  res.status(200).json(await updateHistory({videoId, userId, watched}))
}