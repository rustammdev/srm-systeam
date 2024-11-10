import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateScienceDto {
  @IsString()
  @IsOptional()
  science?: string;

  @IsString()
  @IsOptional()
  price?: string;

  // davomiylig
  @IsString()
  @IsOptional()
  term?: string;
}
