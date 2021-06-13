import db from "../db";
import SQL from "sql-template-strings";
import { v4 as uuid } from "uuid";

interface newUser {
  userName: string;
  email: string;
  profilePicUrl?: string;
}

// creates a new user
export const addUser = async ({
  userName,
  email,
  profilePicUrl = "https://via.placeholder.com/100",
}: newUser) => {
  const newId = uuid();

  await db.run(SQL`

    INSERT INTO "users" (
      "userId",
      "userName",
      "email",
      "profilePicUrl"
    ) VALUES (
      ${newId},
      ${userName},
      ${email},
      ${profilePicUrl}
    );

  `);

  return { userId: newId, userName, email, profilePicUrl }
};
