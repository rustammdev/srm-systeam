import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schema/student.scheme';
import { PaymentModule } from '../payment/payment.module';
import { Payment, PaymentSchema } from '../payment/schema/payment.scheme';
import { PaymentService } from '../payment/payment.service';

@Module({
  imports: [
    PaymentModule,
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: Payment.name, schema: PaymentSchema },
    ]),
  ],
  providers: [StudentService, PaymentService],
  controllers: [StudentController],
})
export class StudentModule {}
