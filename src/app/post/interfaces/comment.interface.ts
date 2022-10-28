import {ShortUser} from "src/app/auth/interfaces/auth.interface";

export interface Comment {
  title: string;
  body: string;
  isHide: boolean;
  postId: string;
  created?: Date
  likes: ShortUser[],
  author: ShortUser
  id?: string
}

export interface EditCommentData {
  title?: string;
  body?: string;
  isHide?: boolean;
  likes?: ShortUser[],
}

