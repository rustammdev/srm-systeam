import { IsArray, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
// Enum yaratamiz
enum Status {
  ACTIVE = 'active',
  FREEZ = 'freez',
  COMPLATE = 'complate',
}
export class UpdateGroupDto {
  @IsString()
  @IsOptional()
  name: string;

  // Mongoose id
  @IsString()
  @IsOptional()
  science: string;

  // Mongoose id
  @IsString()
  @IsOptional()
  teacher: string;

  @IsArray()
  @IsOptional()
  weekDays: [string];

  @IsObject()
  @IsOptional()
  time: {
    start: string; // "14:30"
    end: string; // "15:50"
  };

  @IsString()
  @IsOptional()
  @IsEnum(Status, { message: 'Status must be one of: active, freez, blocked' })
  status: string = 'active';
}
