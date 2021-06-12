import db from "../db";
import SQL from 'sql-template-strings';

export interface Video {
  videoId: string;
  userId: string;
  videoName: string;
  description: string;
  access: "public" | "unlisted" | "private";
  timestamp: number;
  length: number;
  thumbnailUrl: string;
}

// gets all the information required to display a video to a user
export const getVideo = async ({ videoId }: { videoId: string }): Promise<Video> => db.get(SQL`

  SELECT * FROM videos WHERE videoId = ${videoId}

`);