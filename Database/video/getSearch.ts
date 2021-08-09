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


// search for videos
export const getSearch = async ({ searchString }: { searchString: string }): Promise<Video[]> => db.all(`

  SELECT 
    videos.*, 
    users.userName, 
    users.profilePicId
  FROM videos, users
  WHERE access = "public"
  AND videos.videoName LIKE '%${searchString}%'
  AND videos.userId = users.userId
  ORDER BY timestamp ASC

`);