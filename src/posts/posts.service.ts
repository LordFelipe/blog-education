import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostUseCase } from './use-cases/create-post';
import { IPostsRepository } from './domain/post.interface.repository';

@Injectable()
export class PostsService {
  constructor(
    @Inject('IPostsRepository')
    private readonly postRepository: IPostsRepository,
  ) {}
  create(createPostDto: CreatePostDto) {
    const usecase = new CreatePostUseCase(this.postRepository);
    return usecase.execute(createPostDto);
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
