// schemas.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Science, ScienceSchema } from './schema/science.schema';
import { ScienceController } from './science.controller';
import { ScienceService } from './science.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Science.name, schema: ScienceSchema }])],
  controllers: [ScienceController],
  providers: [ScienceService],
})
export class ScienceModule {}
