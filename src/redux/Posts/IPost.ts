export interface Comments {
  _id: string;
  content: string;
}
interface User {
  _id: any;
  username: string;
  name: string;
}
interface Likes {
  _id: string;
}
export interface IPost {
  _id: string;
  content: string;
  user: User;
  comments: Comments[];
  likes: Likes[];
  createdAt: string;
  image?: string;
}

