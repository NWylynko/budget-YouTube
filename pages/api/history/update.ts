import type { NextApiRequest, NextApiResponse } from 'next'
import { updateHistory } from "../../../Database/history/update"
import Ajv from "ajv"

const ajv = new Ajv()

const schema = {
  "type": "object",
  "properties": {
    "videoId": { "type": "string" },
    "userId": { "type": "string" },
    "watched": { "type": "number" },
  },
  "required": ["videoId", "userId", "watched"],
  additionalProperties: false
}

interface Body {
  [x: string]: any;
}

const validate = ajv.compile(schema)

export default async function updateHistoryHandler(req: NextApiRequest, res: NextApiResponse) {

  const valid = validate(req.body)

  if (!valid) {
    res.status(400).json({
      message: "Invalid request body",
      errors: validate.errors
    })
    return
  }

  const { videoId, userId, watched } = req.body as Body;

  res.status(200).json(await updateHistory({videoId, userId, watched}))
}