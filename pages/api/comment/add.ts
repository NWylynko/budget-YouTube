import type { NextApiRequest, NextApiResponse } from 'next'
import { addComment } from "../../../Database/comment/add"
import Ajv from "ajv"

interface Body {
  [x: string]: any;
}

const ajv = new Ajv()

const schema = {
  type: "object",
  properties: {
    videoId: { type: "string" },
    comment: { type: "string", minimum: 1, maximum: 1000 },
    userId: { type: "string" },
  },
  required: ["videoId", "comment", "userId"],
  additionalProperties: false
}

const validate = ajv.compile(schema)

export default async function addCommentHandler(req: NextApiRequest, res: NextApiResponse) {

  const valid = validate(req.body)

  if (!valid) {
    res.status(400).json({
      message: "Invalid request body",
      errors: validate.errors
    })
    return
  }

  const { videoId, userId, comment } = req.body as Body;

  res.status(200).json(await addComment({videoId, userId, message: comment}))
}