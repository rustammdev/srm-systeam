import { IsNotEmpty, IsString } from 'class-validator';

export class AuthModerDto {
  // Company Name
  // Tanlashi kerak
  @IsString()
  @IsNotEmpty()
  companyName: string;

  // Login
  @IsString()
  @IsNotEmpty()
  userName: string;

  // Password
  @IsString()
  @IsNotEmpty()
  password: string;
}
