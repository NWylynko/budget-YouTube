import db from "../db";
import SQL from 'sql-template-strings';

export interface Resolution {
  resolutionId: string;
  videoId: string;
  width: string;
  height: string;
  status: "ADDED" | "PROCESSING" | "DONE" | "ERROR";
}

// gets all the resolutions of a video that are available
export const getResolutions = async ({ videoId }: { videoId: string }): Promise<Resolution[]> => db.all(SQL`

  SELECT * FROM resolutions WHERE videoId = ${videoId}

`);