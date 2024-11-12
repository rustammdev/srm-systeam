import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateWaitingDto {
  @IsOptional()
  @IsString()
  company: string;

  @IsString()
  @IsOptional()
  firstname: string;

  @IsString()
  @IsOptional()
  lastname: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  science: string;

  @IsString()
  @IsOptional()
  description: string;
}
