import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateArxivDto {
  @IsOptional()
  @IsString()
  company: string;
}
