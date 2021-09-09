import db from "../db";
import SQL from 'sql-template-strings';

interface Subscriber {
  userId: string;
  userName: string;
  profilePicId: string;
}

// gets a list of all the users a user is subscribed to
export const getAllSubscriber = async ({ userId }: { userId: string }): Promise<Subscriber[]> => db.get(SQL`

  SELECT users.userId, users.userName, users.profilePicId
  FROM subscribers, users
  WHERE subscriber = ${userId}
  AND subscribers.subscribee = users.userId

`);