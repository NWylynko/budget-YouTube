import db from "../db";
import SQL from 'sql-template-strings';

// create all the tables required for the database
export const createTables = async () => db.exec(SQL`

  CREATE TABLE "users" (
    "userId"	TEXT NOT NULL UNIQUE,
    "userName"	TEXT NOT NULL,
    "email"	TEXT UNIQUE,
    "profilePicUrl"	TEXT NOT NULL,
    PRIMARY KEY("userId")
  );

  CREATE TABLE "videos" (
    "videoId"	TEXT NOT NULL UNIQUE,
    "userId"	TEXT NOT NULL,
    "videoName"	TEXT NOT NULL,
    "description"	TEXT,
    "access"	TEXT NOT NULL,
    "timestamp"	INTEGER NOT NULL,
    "length"	INTEGER,
    "thumbnailUrl"	TEXT,
    "views"	INTEGER NOT NULL DEFAULT 0,
    "viewsLastCalc"	INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY("videoId"),
    FOREIGN KEY("userId") REFERENCES "users"("userId")
  );

  CREATE TABLE "comments" (
    "commentId"	TEXT NOT NULL UNIQUE,
    "videoId"	TEXT NOT NULL,
    "userId"	TEXT NOT NULL,
    "timestamp"	INTEGER NOT NULL,
    "message"	TEXT NOT NULL,
    FOREIGN KEY("userId") REFERENCES "users"("userId"),
    FOREIGN KEY("videoId") REFERENCES "videos"("videoId"),
    PRIMARY KEY("commentId")
  );

  CREATE TABLE "subscribers" (
    "subscribee"	TEXT NOT NULL,
    "subscriber"	TEXT NOT NULL,
    FOREIGN KEY("subscribee") REFERENCES "users"("userId"),
    FOREIGN KEY("subscriber") REFERENCES "users"("userId"),
    PRIMARY KEY("subscribee","subscriber")
  );

  CREATE TABLE "votes" (
    "videoId"	TEXT NOT NULL,
    "userId"	TEXT NOT NULL,
    "type"	TEXT NOT NULL,
    FOREIGN KEY("videoId") REFERENCES "videos"("videoId"),
    FOREIGN KEY("userId") REFERENCES "users"("userId")
  );

  CREATE TABLE "history" (
    "videoId"	TEXT NOT NULL,
    "userId"	TEXT NOT NULL,
    "timestamp"	INTEGER NOT NULL,
    "watched"	INTEGER NOT NULL,
    FOREIGN KEY("userId") REFERENCES "users"("userId"),
    FOREIGN KEY("videoId") REFERENCES "videos"("videoId")
    PRIMARY KEY("videoId","userId")
  );

`);