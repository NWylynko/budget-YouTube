import db from "../db";
import SQL from 'sql-template-strings';

// removes a video
export const removeVideo = async ({ videoId }: { videoId: string }) => db.run(SQL`

  DELETE FROM "videos"
  WHERE "videoId" = ${videoId};

`);