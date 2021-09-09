import type { NextApiRequest, NextApiResponse } from 'next'
import { addSubscriber } from "../../../Database/subscriber/add"
import Ajv from "ajv"

const ajv = new Ajv()

const schema = {
  type: 'object',
  properties: {
    subscribee: { type: 'string' },
    subscriber: { type: 'string' },
  },
  required: ['subscribee', 'subscriber'],
  additionalProperties: false
}

interface Body {
  [x: string]: string;
}

const validate = ajv.compile(schema)

export default async function addSubscriberHandler(req: NextApiRequest, res: NextApiResponse) {

  const valid = validate(req.body)

  if (!valid) {
    res.status(400).json({
      message: "Invalid request body",
      errors: validate.errors
    })
    return
  }

  const { subscribee, subscriber } = req.body as Body;

  console.log({ subscribee, subscriber })

  res.status(200).json(await addSubscriber({subscribee, subscriber}))
}