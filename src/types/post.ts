import { User } from "./user";

export type Post = {
  id: string;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;
  imageUrl: string | null;
  users: User | null;
};
