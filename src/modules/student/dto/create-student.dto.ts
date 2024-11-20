import { IsBoolean, IsEmpty, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
enum paymentStatus {
  paid = 'paid',
  unpaid = 'unpaid',
}

enum status {
  studying = 'studying',
  graduated = 'graduated',
  expelled = 'expelled',
}

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsBoolean()
  @IsOptional()
  toAttend: boolean;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  groupId: string;

  @IsEnum(paymentStatus, { message: 'Status must be one of: paid, unpaid' })
  @IsOptional()
  paymentStatus: string;

  @IsEnum(status, { message: 'Status must be one of: studying, graduated, expelled' })
  @IsOptional()
  status: string;
}
