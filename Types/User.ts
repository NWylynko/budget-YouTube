export interface User {
  name: {
    first: string;
    last: string;
  };
  profilePicUrl: string;
  subscribers: number;
}