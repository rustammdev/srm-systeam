import { IsNotEmpty, IsString } from 'class-validator';

export class AuthModerDto {
  // Login
  @IsString()
  @IsNotEmpty()
  username: string;

  // Password
  @IsString()
  @IsNotEmpty()
  password: string;
}
