import db from "../db";
import SQL from 'sql-template-strings';

// gets a users history
export const getAllHistory = async ({userId}: { userId: string }) => db.all(SQL`

  SELECT 
    videos.videoId, 
    users.userId, 
    users.userName,
    users.profilePicUrl,
    history.timestamp,
    history.watched,
    videos.description,
    videos.length,
    videos.thumbnailUrl,
    videos.videoName
  FROM history, videos, users
  WHERE history.userId = ${userId}
  AND videos.userId = history.userId
  AND users.userId = history.userId

`);