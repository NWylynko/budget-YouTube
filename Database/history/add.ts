import db from "../db";
import SQL from 'sql-template-strings';
import { calculateViews } from "../views/calculateViews";

// adds a video to a users history
export const addHistory = async ({ videoId, userId }: { videoId: string, userId: string }) => {

  const timestamp = Date.now();

  const results = await db.get(SQL`
  
    SELECT *
    FROM history
    WHERE videoId = ${videoId}
    AND userId = ${userId}

  `);

  if (results === undefined) {

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

    await calculateViews({ videoId });

  }

  return { videoId, userId, timestamp, watched: 0 }

}