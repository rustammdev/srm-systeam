import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

enum status {
  paid = 'paid',
  unpaid = 'unpaid',
}

export class UpdatePaymentDto {
  @IsString()
  @IsOptional()
  studentId?: string;

  @IsString()
  @IsOptional()
  science?: string;

  @IsString()
  @IsOptional()
  dateOfPayment?: string;

  @IsString()
  @IsOptional()
  @IsEnum(status, { message: 'Status must be one of: paid, unpaid' })
  status?: string = status.unpaid;
}
