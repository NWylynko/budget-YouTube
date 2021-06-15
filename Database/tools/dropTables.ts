import db from "../db";
import fs from "fs/promises"
import Path from "path"

export const dropTables = async () => {
  const path = Path.join(__dirname, '../../../../../database.db')
  
  await db.close()

  await fs.unlink(path)

  await db.open()

}