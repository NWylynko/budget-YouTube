import type { User, Comment } from "."

export interface Video {
  videoId: string;
  videoName: string;
  description: string;
  thumbnailId: string;
  userId: string;
  timestamp: Date;
  // views: number;
  length: number;
  // likes: number;
  // dislikes: number;
  // comments: Comment[];
}