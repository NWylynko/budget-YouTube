import db from "../db";
import SQL from "sql-template-strings";

const fiveMinutes = 1000 * 60 * 60 * 5;

// if the viewsLastCalc timestamp is older than 5 minutes than this function 
// re-calculates the number of views the video has
// and updates the row in the database of the video
// this gets called every time someone watches a video
// but its unnecessarily to re-calculate this every time a person watches
// so running at max every 5 minutes is a reasonable middle ground
export const calculateViews = async ({ videoId }: { videoId: string }) => {
  const { viewsLastCalc } = await db.get<{ viewsLastCalc: number }>(SQL`
    SELECT viewsLastCalc
    FROM videos
    WHERE videoId = ${videoId}
  `);

  if (Date.now() - fiveMinutes > viewsLastCalc) {
    return { error: "try again in five minutes" };
  }

  const { views } = await db.get<{ views: number }>(SQL`
    SELECT count(videoId) as views
    FROM history
    WHERE videoId = ${videoId}
  `);

  await db.run(SQL`
    UPDATE "videos"
    SET
      "views" = ${views}
    WHERE "videoId" = ${videoId}
  `);

  return { videoId, views };
};
