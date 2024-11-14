import { AttendanceModule } from './modules/attendance/attendance.module';
import { CustomerModule } from './modules/customer/customer.module';
import { ScienceModule } from './modules/science/science.module';
import { StudentModule } from './modules/student/student.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { PaymentModule } from './modules/payment/payment.module';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import 'dotenv/config';
import { GroupModule } from './modules/group/group.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule,
    AdminModule,
    CustomerModule,
    ScienceModule,
    StudentModule,
    TeacherModule,
    GroupModule,
    PaymentModule,
    AttendanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
