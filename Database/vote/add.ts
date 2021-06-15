import db from "../db";
import SQL from 'sql-template-strings';

interface newVote {
  videoId: string;
  userId: string;
  type: "like" | "dislike";
}

// adds a new vote be a user to a video, if the 
// user changes there mind to the opposite type
// the client must use the update function
export const addVote = async ({ videoId, userId, type }: newVote) => {

  await db.run(SQL`

    INSERT INTO "votes" (
      "videoId",
      "userId",
      "type"
    ) VALUES (
      ${videoId},
      ${userId},
      ${type}
    );

  `);

  return { videoId, userId, type }

}