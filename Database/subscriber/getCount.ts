import db from "../db";
import SQL from 'sql-template-strings';

// gets the number of subscribers a user has
export const getSubscriberCount = async ({ userId }: { userId: string }) => {

  const { subscribers } = await db.get<{ subscribers: number }>(SQL`
    SELECT count(subscribee) as subscribers
    FROM subscribers
    WHERE subscribee = ${userId}
  `);

  return { subscribers }

}