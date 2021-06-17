import db from "../db";
import SQL from "sql-template-strings";
import { v4 as uuid } from "uuid";

interface newUser {
  userName: string;
  email: string;
  profilePicId: string;
}

// creates a new user
export const addUser = async ({
  userName,
  email,
  profilePicId,
}: newUser) => {
  const newId = uuid();

  await db.run(SQL`

    INSERT INTO "users" (
      "userId",
      "userName",
      "email",
      "profilePicId"
    ) VALUES (
      ${newId},
      ${userName},
      ${email},
      ${profilePicId}
    );

  `);

  return { userId: newId, userName, email, profilePicId }
};
