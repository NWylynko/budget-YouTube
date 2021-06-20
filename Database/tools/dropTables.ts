import db from "../db";
import fs from "fs/promises";
import path from "path";
import SQL from "sql-template-strings";

export const dropTables = async () => {
  await db.exec(SQL` 
  
    drop table if exists history;
    drop table if exists votes;
    drop table if exists subscribers;
    drop table if exists comments;
    drop table if exists videos;
    drop table if exists users;
  
  `);

  const imagePath = path.join(process.cwd(), `./storage`);

  await fs.rm(imagePath, { recursive: true, force: true })
};
