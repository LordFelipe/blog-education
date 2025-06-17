import { Inject } from '@nestjs/common';
import { Post } from '../domain/post.entity';
import { IPost } from '../domain/post.interface';
import { IPostsRepository } from '../domain/post.interface.repository';
import { CreatePostDto } from '../dto/create-post.dto';
import { randomUUID } from 'crypto';

export class CreatePostUseCase {
  constructor(
    @Inject('IPostsRepository')
    private readonly postRepository: IPostsRepository,
  ) {}

  async execute(dto: CreatePostDto): Promise<Post> {
    const postProps = {
      id: randomUUID(),
      title: dto.title,
      content: dto.content,
      image: dto.image,
    };
    const post = new Post(postProps);

    const created = await this.postRepository.create(post);
    return created;
  }
}
