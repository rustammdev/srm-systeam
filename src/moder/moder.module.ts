import { Module } from '@nestjs/common';
import { ModerController } from './moder.controller';
import { ModerService } from './moder.service';

@Module({
  controllers: [ModerController],
  providers: [ModerService],
})
export class ModerModule {}
