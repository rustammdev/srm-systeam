import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAttendanceDto {
  @IsOptional()
  @IsMongoId()
  student?: string;

  @IsOptional()
  @IsMongoId()
  group?: string;

  @IsOptional()
  @IsBoolean()
  toAttend?: boolean;

  @IsString()
  @IsOptional()
  description?: string;
}
