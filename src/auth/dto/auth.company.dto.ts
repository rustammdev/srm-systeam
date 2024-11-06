import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

// Enum yaratamiz
enum Status {
  ACTIVE = 'active',
  FREEZ = 'freez',
  BLOCKED = 'blocked',
}

export class AuthCompanyDto {
  // Company name
  @IsString()
  @IsNotEmpty()
  companyName: string;

  // Telegram generate password
  @IsString()
  @IsNotEmpty()
  password: string;

  // // status - freez | active | blocked
  // @IsString()
  // @IsNotEmpty()
  // @IsEnum(Status, { message: 'Status must be one of: active, freez, blocked' })
  // status: string;
}
