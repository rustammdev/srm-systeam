import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateScienceDto {
  @IsString()
  @IsNotEmpty()
  science: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  // davomiylig
  @IsString()
  @IsNotEmpty()
  term: string;
}
