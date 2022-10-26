export interface Post {
  title: string;
  body: string;
  author: postAuthor;
  isHide: boolean;
  commentsDisabled: boolean;
  id?:string;
}

export interface postAuthor {
  id: string;
  name: string;
  email: string;
}
