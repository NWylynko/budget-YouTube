import db from "../db";
import SQL from "sql-template-strings";

const fiveMinutes = 1000 * 60 * 60 * 5;

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
