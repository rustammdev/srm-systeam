import { IsArray, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
enum Status {
  ACTIVE = 'active',
  FREEZ = 'freez',
  COMPLATE = 'complate',
}
export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  // Mongoose id
  @IsString()
  @IsNotEmpty()
  science: string;

  // Mongoose id
  @IsString()
  @IsNotEmpty()
  teacher: string;

  @IsArray()
  @IsNotEmpty()
  weekDays: [string];

  @IsObject()
  @IsNotEmpty()
  time: {
    start: string; // "14:30"
    end: string; // "15:50"
  };

  @IsString()
  @IsOptional()
  @IsEnum(Status, { message: 'Status must be one of: active, freez, blocked' })
  status: string = 'active';
}
