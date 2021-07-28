import db from "../db";
import SQL from 'sql-template-strings';

interface Comment {
  commentId: string;
  userId: string;
  timestamp: number;
  message: string;
  userName: string;
  profilePicUrl: string;
}

// get all the comments for a single video
export const getComment = async ({ videoId }: { videoId: string }): Promise<Comment[]> => db.all(SQL`

  SELECT 
    "comments"."commentId", 
    "comments"."userId", 
    "comments"."timestamp", 
    "comments"."message",
    "users"."userName",
    "users"."profilePicId"
  FROM 
    "comments", "users"
  WHERE 
    "videoId" = ${videoId}
  AND
    "comments"."userId" = "users"."userId";
  ORDER BY
    "comments"."timestamp" ASC

`);