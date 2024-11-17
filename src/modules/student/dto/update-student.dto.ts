import { IsOptional, IsString } from 'class-validator';

export class updateStudentDto {
  @IsString()
  @IsOptional()
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
  groupId: [string];
}
