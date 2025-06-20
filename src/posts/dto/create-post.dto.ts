import { IPost } from '../schemas/models/posts.interface';

export class CreatePostDto implements IPost {
  description: string;
  createdAt: Date;
  title: string;
  image: string;
  isPublished: boolean;
}
