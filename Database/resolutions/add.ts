import db from "../db";
import SQL from 'sql-template-strings';
import { v4 as uuid } from "uuid";

interface newResolution {
  videoId: string;
  height: string;
  width: string;
  fileType: string;
}

// creates a new resolution for a video
export const addResolution = async ({ videoId, height, width, fileType }: newResolution) => {

  const resolutionId = uuid();
  const status = "ADDED"

  await db.run(SQL`

    INSERT INTO "resolutions" (
      "resolutionId",
      "videoId",
      "width",
      "height",
      "fileType",
      "status"
    ) VALUES (
      ${resolutionId},
      ${videoId},
      ${width},
      ${height},
      ${fileType},
      ${status}
    );

  `);

  return { resolutionId, videoId, height, width, fileType, status }

}