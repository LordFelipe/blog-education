import { IPost } from './post.interface';

export class Post implements IPost {
  id: string;
  title: string;
  content: string;
  image: string;
  constructor(post: IPost) {
    this.id = post.id;
    this.title = post.title;
    this.content = post.content;
    this.image = post.image;
  }
}
