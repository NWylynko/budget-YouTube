import db from "../db";
import SQL from 'sql-template-strings';

// removes a vote by a user
export const removeVote = async ({ videoId, userId }: { videoId: string; userId: string; }) => {

  await db.run(SQL`

    DELETE FROM "votes"
    WHERE "videoId" = ${videoId}
    AND "userId" = ${userId};

  `);

}