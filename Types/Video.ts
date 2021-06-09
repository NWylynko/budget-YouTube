import type { User } from "."

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  user: User;
  timestamp: Date;
  views: number;
  length: number;
}