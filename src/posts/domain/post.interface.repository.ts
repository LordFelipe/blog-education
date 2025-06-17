import { IPost } from './post.interface';

export interface IPostRepository {
  create(post: IPost): Promise<IPost>;
  findById(id: number): Promise<IPost | null>;
  findAll(): Promise<IPost[]>;
  update(id: number, post: IPost): Promise<IPost | null>;
  delete(id: number): Promise<boolean>;
}
