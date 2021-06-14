import db from "../db";
import SQL from 'sql-template-strings';

import type { Video } from "./get";
import { getVideo } from "./get";

// updates some of the data about the video, but the video itself is 
// immutable, to change it a user must re-upload the new video
export const updateVideo = async ({videoId, newVideo}: {videoId: string, newVideo: Partial<Video>}) => {

  const video = await getVideo({ videoId })

  const updatedVideo = { ...video, ...newVideo }

  const { videoName, description, access, thumbnailUrl, length } = updatedVideo

  await db.run(SQL`

  UPDATE "videos"
  SET
    "videoName" = ${videoName},
    "description" = ${description},
    "access" = ${access},
    "thumbnailUrl" = ${thumbnailUrl},
    "length" = ${length}
  WHERE "videoId" = ${videoId}

  `);

  return updatedVideo

}