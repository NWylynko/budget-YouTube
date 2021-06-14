import db from "../db";
import SQL from 'sql-template-strings';

export const updateHistory = async ({ videoId, userId, watched }: { videoId: string, userId: string, watched: number }) => {

  await db.run(SQL`
    UPDATE "history" ( 
      "watched"
    ) VALUES ( 
      ${watched}
    ) WHERE videoId = ${videoId}
    AND "userId" = ${userId}
  `);

  return { videoId, userId, watched }
}