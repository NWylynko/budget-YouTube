import db from "../db";
import SQL from 'sql-template-strings';

export interface User {
  userId: string;
  userName: string;
  email: string;
  ProfilePicId: string;
}

// gets a list of all the users in the database
export const getAllUser = async (): Promise<User[]> => db.all(SQL`
  SELECT * FROM users;
`);