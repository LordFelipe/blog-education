import { IPost } from 'src/posts/schemas/models/posts.interface';
import { PostRepository } from '../post.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from 'src/posts/schemas/posts.schema';
import { Model } from 'mongoose';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';

export class PostMongooseRepository implements PostRepository {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}
  create(post: any): Promise<IPost> {
    const newPost = new this.postModel(post);
    return newPost.save();
  }
  findAllPublished(): Promise<IPost[]> {
    return this.postModel.find({ isPublished: true }).exec();
  }
  findAll(limit: number, page: number): Promise<IPost[]> {
    const offSet = (page - 1) * limit;
    return this.postModel.find().skip(offSet).limit(limit).exec();
  }
  findOne(id: string): Promise<IPost | null> {
    return this.postModel.findById(id).exec();
  }
  async update(id: string, post: UpdatePostDto): Promise<IPost | undefined> {
    const newPost = await this.postModel.findOneAndUpdate({ _id: id }, post, {
      new: true,
    });
    return newPost || undefined;
  }
  async remove(id: string): Promise<void> {
    await this.postModel.deleteOne({ _id: id }).exec();
  }
  search(term: string): Promise<IPost[]> {
    throw new Error('Method not implemented.');
  }
}
