import { IsArray, IsNotEmpty, IsObject, IsString } from 'class-validator';

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
}
