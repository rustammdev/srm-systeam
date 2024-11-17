import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArxivDto {
  @IsOptional()
  @IsString()
  company: string;
}
