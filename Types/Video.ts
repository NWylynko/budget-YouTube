import type { User, Comment } from "."

export interface Video {
  videoId: string;
  videoName: string;
  description: string;
  thumbnailUrl: string;
  userId: string;
  timestamp: Date;
  // views: number;
  length: number;
  // likes: number;
  // dislikes: number;
  // comments: Comment[];
}