import db from "../db";
import SQL from 'sql-template-strings';

// remove a video from a users history
export const removeHistory = async ({ videoId, userId }: {videoId: string, userId: string}) => {

  await db.run(SQL`
    DELETE FROM "history"
    AND "videoId" = ${videoId}
    WHERE "userId" = ${userId};
  `);

}