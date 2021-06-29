import type { NextApiRequest, NextApiResponse } from 'next'
import { removeSubscriber } from "../../../Database/subscriber/remove"

interface Body {
  [x: string]: string;
}

export default async function removeSubscriberHandler(req: NextApiRequest, res: NextApiResponse) {

  const { subscribee, subscriber } = req.body as Body;

  console.log({ subscribee, subscriber })

  res.status(200).json(await removeSubscriber({subscribee, subscriber}))
}