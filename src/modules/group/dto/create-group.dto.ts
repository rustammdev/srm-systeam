import { IsArray, IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator';

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

  // Dars kunlari (masalan: [1,3,5] - Dush/Chor/Juma)
  // Dars kunlari (masalan: [2,4,6] - Sesh/Pay/Shan)
  // Dars kunlari (masalan: [Har kuni] Dush - Shan)
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
  @IsNotEmpty()
  @IsEnum(Status, { message: 'Status must be one of: active, freez, blocked' })
  status: string = 'active';
}
