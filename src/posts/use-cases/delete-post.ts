import { IPostsRepository } from '../domain/post.interface.repository';

export class DeletePostUseCase {
  constructor(private readonly postRepository: IPostsRepository) {}

  async execute(id: string): Promise<void> {
    return this.postRepository.delete(id);
  }
}
