import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum status {
  paid = 'paid',
  unpaid = 'unpaid',
}

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  science: string;

  @IsString()
  @IsNotEmpty()
  dateOfPayment: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(status, { message: 'Status must be one of: paid, unpaid' })
  status: string = status.paid;
}
