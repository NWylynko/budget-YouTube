import db from "../db";
import SQL from 'sql-template-strings';

// gets the access and owner userId of a video
export const getVideoAccess = async ({ videoId }: { videoId: string}): Promise<{ userId: string, access: "public" | "unlisted" | "private" }> => db.get(SQL`

  SELECT userId, access
  FROM videos
  WHERE videoId = ${videoId}

`);