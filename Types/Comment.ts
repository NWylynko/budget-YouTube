import type { User } from '.';

export interface Comment {
  user: User;
  message: string;
}