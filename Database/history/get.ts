import db from "../db";
import SQL from 'sql-template-strings';

// gets the amount of a video a user has watched (if any)
export const getWatched = async ({videoId, userId}: { videoId: string, userId: string }): Promise<{watched: number} | undefined> => db.get(SQL`
  SELECT 
    watched
  FROM history
  WHERE history.userId = ${userId}
  AND history.videoId = ${videoId}
`);