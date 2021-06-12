import db from "../db";
import SQL from 'sql-template-strings';

import type { Video } from "./get"

// gets a list of videos that are public 
export const getAllVideo = async (): Promise<Video> => db.get(SQL`

  SELECT *
  FROM videos
  WHERE access = "public"
  ORDER BY timestamp ASC

`);