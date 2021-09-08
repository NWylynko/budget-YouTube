import db from "../db";
import SQL from 'sql-template-strings';

import type { User } from "./get"
import { getUser } from "./get"

// updates one or more of the information about a user
export const updateUser = async ({ userId, userName, email, profilePicId }: Partial<User>) => {

  const user = await getUser({ userId })

  const sql = SQL`
    
    UPDATE "users" 
    SET 
      "userName" = ${userName || user.userName},
      "email" = ${email || user.email},
      "profilePicId" = ${profilePicId || user.profilePicId}
    WHERE "userId" = ${userId}

  `

  console.log({sql})

  db.run(sql);

  return await getUser({ userId })

}