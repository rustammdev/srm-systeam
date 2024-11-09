import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Mongoose } from 'mongoose';
import { Group } from './group.scheme';
import { Teacher } from './teacher.scheme';
import { Science } from './science.scheme';

export type LessonScheduleDocument = HydratedDocument<LessonSchedule>;

@Schema({ timestamps: true })
export class LessonSchedule {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Group' })
  group: Group;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' })
  teacher: Teacher;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Science' })
  science: Science;

  @Prop({ required: true, type: String })
  dates: string;

  @Prop({ required: true, type: String })
  room: string;
}

export const LessonScheduleSchema = SchemaFactory.createForClass(LessonSchedule);
