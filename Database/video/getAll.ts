import db from "../db";
import SQL from 'sql-template-strings';

interface Video {
  videoId: string;
  userId: string;
  videoName: string;
  description: string;
  access: "public" | "unlisted" | "private";
  timestamp: number;
  length: number;
  thumbnailId: string;
  profilePicId: string;
  userName: string;
  views: number;
}


// gets a list of videos that are public 
export const getAllVideo = async (): Promise<Video[]> => db.all(SQL`

  SELECT 
    videos.*, 
    users.userName, 
    users.profilePicId
  FROM videos, users
  WHERE access = "public"
  AND videos.userId = users.userId
  ORDER BY timestamp ASC

`);