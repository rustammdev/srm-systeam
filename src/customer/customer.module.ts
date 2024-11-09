import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { ModerService } from './moder.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Moder, ModerSchema } from 'src/schema/moder.scheme';
import { AppModule } from 'src/app.module';

@Module({
  imports: [AuthModule, MongooseModule.forFeature([{ name: Moder.name, schema: ModerSchema }])],
  providers: [CustomerService, ModerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
