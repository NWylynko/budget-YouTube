import db from "../db";
import SQL from 'sql-template-strings';

interface newSubscriber {
  subscribee: string;
  subscriber: string;
}

// subscribers a user to another user
export const addSubscriber = async ({ subscribee, subscriber }: newSubscriber) => {

  if (subscribee === subscriber) {
    return { error: "you can't subscribe to yourself" }
  }

  await db.run(SQL`

    INSERT INTO "subscribers" (
      "subscribee",
      "subscriber"
    ) VALUES (
      ${subscribee},
      ${subscriber}
    );

  `);

  return { subscribed: true }

}