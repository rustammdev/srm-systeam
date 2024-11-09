import { IsNotEmpty, IsString } from 'class-validator';

export class ModerDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
