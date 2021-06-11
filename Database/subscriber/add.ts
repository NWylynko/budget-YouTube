import db from "../db";
import SQL from 'sql-template-strings';

interface newSubscriber {
  subscribee: string;
  subscriber: string;
}

// subscribers a user to another user
export const addSubscriber = async ({ subscribee, subscriber }: newSubscriber) => {

  await db.run(SQL`

    INSERT INTO "comments" (
      "subscribee",
      "subscriber"
    ) VALUES (
      ${subscribee},
      ${subscriber}
    );

  `);

  return { subscribed: true }

}