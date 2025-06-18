import mongoose, { HydratedDocument } from 'mongoose';
import { IUser, UserRole } from './models/user.interface';
import { Prop, Schema } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User implements IUser {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id?: string | undefined;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  password: string;
  @Prop({ default: Date.now() })
  createdAt: Date;
  @Prop({ default: true })
  isActive: boolean;
  @Prop({
    type: mongoose.Schema.Types.String,
    enum: ['teacher', 'student'],
    default: 'student',
  })
  role: UserRole;
}
