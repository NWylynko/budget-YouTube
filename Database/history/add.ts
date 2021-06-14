import db from "../db";
import SQL from 'sql-template-strings';
import { calculateViews } from "../views/calculateViews";

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

  // don't await like this will error 95% of the time (by design) and we don't want the user to wait for it
  calculateViews({ videoId })

  return { videoId, userId, timestamp, watched: 0 }

}