import db from "../db";
import SQL from 'sql-template-strings';

// updates the status of the resolution of a video
export const updateResolution = async ({resolutionId, status}: {resolutionId: string, status: "ADDED" | "PROCESSING" | "DONE" | "ERROR"}) => {

  await db.run(SQL`

    UPDATE "resolutions"
    SET
      "status" = ${status}
    WHERE "resolutionId" = ${resolutionId}

  `);

  return {resolutionId, status}

}