import db from "../db";
import SQL from 'sql-template-strings';

// adds a video to a users history
export const addHistory = async ({ videoId, userId }: { videoId: string, userId: string }) => {

  const timestamp = Date.now();

  await db.run(SQL`
    INSERT INTO "history" (
      "videoId",
      "userId",
      "timestamp",
      "watched"
    ) VALUES (
      ${videoId},
      ${userId},
      ${timestamp},
      "0"
    );
  `);

  return { videoId, userId, timestamp, watched: 0 }

}