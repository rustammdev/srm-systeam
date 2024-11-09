import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
import { CustomerModule } from './customer/customer.module';
import 'dotenv/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/roles.guard';
import { Moder } from './schema/moder.scheme';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URL), AuthModule, AdminModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
