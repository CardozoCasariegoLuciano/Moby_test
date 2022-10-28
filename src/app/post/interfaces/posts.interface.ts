export interface Post {
  title: string;
  body: string;
  author: postAuthor;
  isHide: boolean;
  commentsDisabled: boolean;
  id?: string;
  created?: Date;
}

export interface postAuthor {
  id: string;
  name: string;
  email: string;
}

export interface EditPostData {
  title?: string;
  body?: string;
  isHide?: boolean;
  commentsDisabled?: boolean;
}
