import db from "../db";
import SQL from 'sql-template-strings';

// gets a users history
export const getAllHistory = async ({userId}: { userId: string }) => db.all(SQL`

  SELECT
    history.timestamp,
    history.watched,
    videos.videoId,
    videos.description,
    videos.length,
    videos.thumbnailId,
    videos.videoName,
    users.userId, 
    users.userName,
    users.profilePicId
  FROM history, videos, users
  WHERE history.userId = ${userId}
  AND history.videoId = videos.videoId
  AND videos.userId = users.userId
  ORDER BY history.timestamp DESC

`);