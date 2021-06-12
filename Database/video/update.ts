import db from "../db";
import SQL from 'sql-template-strings';

import type { Video } from "./get";
import { getVideo } from "./get";

// updates some of the data about the video, but the video itself is 
// immutable, to change it a user must re-upload the new video
export const updateVideo = async ({videoId, newVideo}: {videoId: string, newVideo: Partial<Video>}) => {

  const video = await getVideo({ videoId })

  const updatedVideo = { ...video, ...newVideo }

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