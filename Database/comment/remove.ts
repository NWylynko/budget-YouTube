import db from "../db";
import SQL from 'sql-template-strings';

// remove a comment from a video
export const removeComment = async ({ commentId }: { commentId: string }) => {

  await db.run(SQL`
  
    DELETE FROM "comments"
    WHERE "commentId" = ${commentId};
  
  `);

  return { commentId }

}