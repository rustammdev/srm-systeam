// schemas.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Science, ScienceSchema } from './schema/science.schema';
import { ScienceController } from './science.controller';
import { ScienceService } from './science.service';
import { Teacher, TeacherSchema } from '../teacher/schema/teacher.scheme';
import { TeacherModule } from '../teacher/teacher.module';

@Module({
  imports: [
    TeacherModule,
    MongooseModule.forFeature([
      { name: Science.name, schema: ScienceSchema },
      { name: Teacher.name, schema: TeacherSchema },
    ]),
  ],
  controllers: [ScienceController],
  providers: [ScienceService],
})
export class ScienceModule {}
