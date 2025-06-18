export type UserRole = 'teacher' | 'student';
export interface IUser {
  id?: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  isActive: boolean;
  role: UserRole;
}
