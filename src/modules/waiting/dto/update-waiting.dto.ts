import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWaitingDto {
  @IsOptional()
  @IsString()
  company: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  science: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
