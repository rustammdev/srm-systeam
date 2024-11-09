import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Group } from './group.scheme';
import { Science } from './science.scheme';

export type TeacherDocument = HydratedDocument<Teacher>;

@Schema({ timestamps: true })
export class Teacher {
  @Prop({ required: true, type: String })
  firstname: string;

  @Prop({ required: true, type: String })
  lastname: string;

  @Prop({ required: true, type: String })
  phoneNumber: string;

  @Prop({ required: true, type: mongoose.Schema.ObjectId, ref: 'Science' })
  specialty: Science;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
