import db from "../db";
import SQL from 'sql-template-strings';

import type { User } from "./get"
import { getUser } from "./get"

// updates one or more of the information about a user
export const removeUser = async ({ userId, userName, email, ProfilePicUrl }: Partial<User>) => {

  const numOfItemsToUpdate = [userName, email, ProfilePicUrl].filter(value => value !== undefined).length

  const sql = SQL`
    
    UPDATE "users" 
    SET 
      ${userName && '"userName"=' + userName + (numOfItemsToUpdate === 1 ? '' : ',')}
      ${email && '"email"=' + email + (numOfItemsToUpdate === 2 ? '' : ',')}
      ${ProfilePicUrl && '"ProfilePicUrl"=' + ProfilePicUrl + (numOfItemsToUpdate === 3 ? '' : ',')}
    WHERE "userId" = ${userId}

  `

  console.log(sql)

  db.run(sql);

  return await getUser({ userId })

}