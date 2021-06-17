import db from "../db";
import fs from "fs/promises"
import Path from "path"
import SQL from 'sql-template-strings';

export const dropTables = async () => {

  try {

    const path = Path.join(__dirname, '../../../../../database.db')
  
    await db.close()
  
    await fs.unlink(path)
  
    await db.open()

  } catch (error) {
    
    await db.exec(SQL` 
    
      drop table if exists history;
      drop table if exists votes;
      drop table if exists subscribers;
      drop table if exists comments;
      drop table if exists videos;
      drop table if exists users;
    
    `);

  }



}