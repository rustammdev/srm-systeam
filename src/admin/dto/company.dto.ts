import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// Enum yaratamiz
enum Status {
  ACTIVE = 'active',
  FREEZ = 'freez',
  BLOCKED = 'blocked',
}
export class CompanyDto {
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  // // status - freez | active | blocked
  @IsString()
  @IsNotEmpty()
  @IsEnum(Status, { message: 'Status must be one of: active, freez, blocked' })
  status: string = 'active';
}
