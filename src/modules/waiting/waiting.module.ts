import { Waiting, WaitingSchema } from './schema/waiting.schema';
import { WaitingController } from './waiting.controller';
import { WaitingService } from './waiting.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [MongooseModule.forFeature([{ name: Waiting.name, schema: WaitingSchema }])],
  controllers: [WaitingController],
  providers: [WaitingService],
})
export class WaitingModule {}
