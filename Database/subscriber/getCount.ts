import db from "../db";
import SQL from 'sql-template-strings';

// gets the number of subscribers a user has
export const getSubscriberCount = async ({ userId }: { userId: string }) => {

  const results = await db.get(SQL`
    SELECT count(subscribee)
    FROM subscribers
    WHERE subscribee = ${userId}
  `);

  return { subscribers: results["count(subscribee)"] }

}