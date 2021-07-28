import db from "../db";
import SQL from 'sql-template-strings';

// gets if a user has liked, disliked or neither a video
export const getVote = async ({ videoId, userId }: { videoId: string, userId: string }): Promise<{ vote: "like" | "dislike" | null}> => {

  const data: any = await db.get(SQL`
    SELECT type 
    FROM votes 
    WHERE videoId = ${videoId}
    AND userId = ${userId}
  `);

  if (!data) {
    return { vote: null }
  }

  return { vote: data.type }

}