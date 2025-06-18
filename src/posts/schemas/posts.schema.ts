import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IPost } from './models/posts.interface';
import mongoose, { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({})
export class Post implements IPost {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id?: string | undefined;
  @Prop({ required: true, max: 130 })
  title: string;
  @Prop({ required: true, max: 200 })
  description: string;
  @Prop({ required: true })
  image: string;
  @Prop({ default: Date.now() })
  createdAt: Date;
  @Prop({ required: true, default: false })
  isPublished: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
