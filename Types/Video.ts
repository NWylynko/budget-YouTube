import type { User, Comment } from "."

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  user: User;
  timestamp: Date;
  views: number;
  length: number;
  likes: number;
  dislikes: number;
  comments: Comment[];
}