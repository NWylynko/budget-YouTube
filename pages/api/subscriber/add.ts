import type { NextApiRequest, NextApiResponse } from 'next'
import { addSubscriber } from "../../../Database/subscriber/add"

interface Body {
  [x: string]: string;
}

export default async function addSubscriberHandler(req: NextApiRequest, res: NextApiResponse) {

  const { subscribee, subscriber } = req.body as Body;

  console.log({ subscribee, subscriber })

  res.status(200).json(await addSubscriber({subscribee, subscriber}))
}