import { Post } from '../domain/post.entity';
import { IPost } from '../domain/post.interface';
import { IPostRepository } from '../domain/post.interface.repository';

export class CreatePostUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(post: IPost): Promise<IPost> {
    const newPost = new Post(post);
    return this.postRepository.create(newPost);
  }
}
