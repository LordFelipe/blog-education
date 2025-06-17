import { Inject } from '@nestjs/common';
import { IPostsRepository } from '../domain/post.interface.repository';
import { UpdatePostDto } from '../dto/update-post.dto';
import { IPost } from '../domain/post.interface';

export class UpdatePostUseCase {
  constructor(
    @Inject('IPostsRepository')
    private readonly postRepository: IPostsRepository,
  ) {}

  execute = async (
    id: string,
    body: UpdatePostDto,
  ): Promise<IPost | undefined> => {
    const existPost = await this.postRepository.findById(id);
    if (!existPost) {
      throw new Error(`Post with id ${id} not found`);
    }
    const execute = await this.postRepository.update(id, body);
    return execute;
  };
}
