import db from "../db";
import SQL from 'sql-template-strings';

// removes a user
export const removeUser = async ({ userId }: { userId: string }) => {

  db.run(SQL`

    DELETE FROM "comments"
    WHERE "commentId" = ${userId};

  `);

  return { userId }
}