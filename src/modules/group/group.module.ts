import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './schema/group.scheme';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Teacher, TeacherSchema } from '../teacher/schema/teacher.scheme';

@Module({
  imports: [MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
