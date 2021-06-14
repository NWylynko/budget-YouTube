import db from "../db";
import SQL from 'sql-template-strings';

// gets a count of all the likes and dislikes a video has
export const getVote = async ({ videoId }: { videoId: string }) => {

  const { likes } = await db.get(SQL`
    SELECT count(type) as likes 
    FROM votes 
    WHERE videoId = ${videoId}
    AND type = "like"
  `);

  const { dislikes } = await db.get(SQL`
    SELECT count(type) as dislikes 
    FROM votes 
    WHERE videoId = ${videoId}
    AND type = "dislike"
  `);

  return { likes, dislikes }

}