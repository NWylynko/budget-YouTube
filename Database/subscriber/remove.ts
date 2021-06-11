import db from "../db";
import SQL from 'sql-template-strings';

interface removeSubscriber {
  subscriber: string;
  subscribee: string;
}

// remove a user from being subscribed to another user
export const removeSubscriber = async ({ subscribee, subscriber }: removeSubscriber) => {

  await db.run(SQL`
    
    DELETE FROM "subscriber"
    WHERE "subscribee" = ${subscribee}
    AND "subscriber" = ${subscriber}

  `);

  return { subscribed: false }

}