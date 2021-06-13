import db from "../db";
import SQL from 'sql-template-strings';
import { v4 as uuid } from "uuid";

interface newVideo {
  userId: string;
  videoName: string;
  access: string;
}

export const addVideo = async ({ userId, videoName, access }: newVideo) => {

  const newId = uuid();
  const timestamp = Date.now();

  await db.run(SQL`

    INSERT INTO "videos" (
      "videoId",
      "userId",
      "videoName",
      "access",
      "timestamp"
    ) VALUES (
      ${newId},
      ${userId},
      ${videoName},
      ${access},
      ${timestamp}
    );

  `);

  return { videoId: newId, userId, videoName, access, timestamp }

}