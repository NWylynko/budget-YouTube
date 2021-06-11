import db from "../db";
import SQL from 'sql-template-strings';

interface getSubscriber {
  subscriber: string;
  subscribee: string;
}

// gets if a user is subscribed to another user
export const getSubscriber = async ({ subscriber, subscribee }: getSubscriber) => {

  const result = await db.get(SQL`
    SELECT count(subscribee) 
    FROM subscribers 
    WHERE subscriber = ${subscriber}
    AND subscribee = ${subscribee};
  `);

  return { subscribed: result["count(subscribee)"] === 1 }

}