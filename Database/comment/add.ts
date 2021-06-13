import db from "../db";
import SQL from 'sql-template-strings';
import { v4 as uuid } from "uuid";

interface newComment {
  videoId: string;
  userId: string;
  message: string;
}

export const addComment = async ({ videoId, userId, message }: newComment) => {

  const newId = uuid();
  const timestamp = Date.now();

  await db.run(SQL`

    INSERT INTO "comments" (
      "commentId",
      "videoId",
      "userId",
      "timestamp",
      "message"
    ) VALUES (
      ${newId},
      ${videoId},
      ${userId},
      ${timestamp},
      ${message}
    );

  `);

  return { commentId: newId, videoId, userId, timestamp, message }

}