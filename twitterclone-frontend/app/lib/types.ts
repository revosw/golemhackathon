

export interface User {
  username: string;
  followers: string[];
  following: string[];
  posts: Post[];
}

export interface Post {
  id: string;
  user: User;
  content: string;
  timestamp: string; // ISO string
}
