import db from "../db";
import SQL from 'sql-template-strings';

import type { Video } from "./get"

// gets a list of videos that a user has posted that are public
export const getUserAllVideo = async ({ userId, access }: { userId: string, access: "public" | "private" | "unlisted" }): Promise<Video[]> => db.all(SQL`

  SELECT *
  FROM videos
  WHERE userId = ${userId}
  AND access = ${access}
  ORDER BY timestamp ASC

`);