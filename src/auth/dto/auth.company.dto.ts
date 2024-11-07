import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class AuthCompanyDto {
  // Company name
  @IsString()
  @IsNotEmpty()
  companyName: string;

  // Telegram generate password
  @IsString()
  @IsNotEmpty()
  password: string;
}
