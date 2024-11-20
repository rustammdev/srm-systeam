import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schema/student.scheme';
import { PaymentModule } from '../payment/payment.module';
import { Payment, PaymentSchema } from '../payment/schema/payment.scheme';
import { PaymentService } from '../payment/payment.service';
import { AttendanceModule } from '../attendance/attendance.module';
import { Attendance, AttendanceSchema } from '../attendance/schema/attendance.scheme';

@Module({
  imports: [
    PaymentModule,
    AttendanceModule,
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: Payment.name, schema: PaymentSchema },
      { name: Attendance.name, schema: AttendanceSchema },
    ]),
  ],
  providers: [StudentService, PaymentService],
  controllers: [StudentController],
})
export class StudentModule {}
