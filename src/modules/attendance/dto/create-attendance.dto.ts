import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';

export class CretaAttendanceDto {
  @IsNotEmpty()
  @IsMongoId()
  student: string;

  @IsNotEmpty()
  @IsMongoId()
  group: string;

  @IsNotEmpty()
  @IsBoolean()
  toAttend: boolean;

  @IsString()
  @IsOptional()
  description: string;
}
