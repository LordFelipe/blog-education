import { IPost } from '../domain/post.interface';
import { IPostsRepository } from '../domain/post.interface.repository';

export class FindAllPostsUseCase {
  constructor(private readonly postsService: IPostsRepository) {}

  async execute(): Promise<IPost[]> {
    return this.postsService.findAll();
  }
}
