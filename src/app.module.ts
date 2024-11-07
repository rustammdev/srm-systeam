import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { ModerModule } from './moder/moder.module';
import 'dotenv/config';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    AdminModule,
    CustomerModule,
    ModerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
