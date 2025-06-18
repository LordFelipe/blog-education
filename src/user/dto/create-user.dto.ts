import { IUser, UserRole } from '../schemas/models/user.interface';

export class CreateUserDto {
  id?: string | undefined;
  createdAt: Date;
  isActive: boolean;
  role: UserRole;
  email: string;
  name: string;
  password: string;
}
