import type { NextApiRequest, NextApiResponse } from 'next'
import { addVote } from "../../../Database/vote/add"
import Ajv from "ajv"

const ajv = new Ajv()

const schema = {
  "type": "object",
  "properties": {
    "videoId": { "type": "string" },
    "userId": { "type": "string" },
    "type": { "type": "string" }
  },
  "required": ["videoId", "userId", "type"],
  additionalProperties: false
}

const validate = ajv.compile(schema)

export default async function addVoteHandler(req: NextApiRequest, res: NextApiResponse) {
  
  const valid = validate(req.body)

  if (!valid) {
    res.status(400).json({
      message: "Invalid request body",
      errors: validate.errors
    })
    return
  }

  res.status(200).json(await addVote(req.body))
}