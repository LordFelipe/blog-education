import { IPost } from '../domain/post.interface';
import { IPostsRepository } from '../domain/post.interface.repository';

export class FindByIdPostUseCase {
  constructor(private readonly postsService: IPostsRepository) {}

  async execute(id: string): Promise<IPost | undefined> {
    return this.postsService.findById(id);
  }
}
