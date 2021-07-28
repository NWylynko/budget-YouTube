import db from "../db";
import SQL from 'sql-template-strings';

interface Vote {
  videoId: string;
  userId: string;
  type: "like" | "dislike";
}

// if the user changes there mind on a vote the can change it
export const updateVote = async ({ videoId, userId, type }: Vote) => {

  await db.run(SQL`
  
    UPDATE "votes"
    SET
      "type" = ${type}
    WHERE "videoId" = ${videoId}
    AND "userId" = ${userId}

  `);

  return { type }

}