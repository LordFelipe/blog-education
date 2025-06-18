import { IUser } from '../schemas/models/user.interface';

export abstract class UserRepository {
  abstract create(user: IUser): Promise<IUser>;
  abstract findAll(): Promise<IUser[]>;
  abstract findOne(id: string): Promise<IUser | null>;
  abstract update(id: string, user: IUser): Promise<IUser | undefined>;
  abstract remove(id: string): Promise<void>;
}
