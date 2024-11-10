import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Moder, ModerSchema } from './schema/moder.scheme';

@Module({
  imports: [AuthModule, MongooseModule.forFeature([{ name: Moder.name, schema: ModerSchema }])],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
