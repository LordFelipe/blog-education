import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PublicPostsController } from './controllers/public.posts.controller';
import { AdminPostsController } from './controllers/admin.posts.controller';

@Module({
  controllers: [PublicPostsController, AdminPostsController],
  providers: [PostsService],
})
export class PostsModule {}
