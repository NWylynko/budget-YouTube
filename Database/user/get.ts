import db from "../db";
import SQL from 'sql-template-strings';

export interface User {
  userId: string;
  userName: string;
  email: string;
  profilePicId: string;
}

// gets the user information about a user
export const getUser = async ({ userId }: { userId: string }): Promise<User> => db.get(SQL`
  SELECT * FROM users WHERE userId = ${userId};
`);