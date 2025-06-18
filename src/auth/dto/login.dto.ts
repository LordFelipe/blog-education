import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string;

  @IsString()
  password: string;
}
