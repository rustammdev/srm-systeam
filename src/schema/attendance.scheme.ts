import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Mongoose } from 'mongoose';
import { Student } from './student.scheme';

export type AttendanceDocument = HydratedDocument<Attendance>;

@Schema({ timestamps: true })
export class Attendance {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Student' })
  student: Student;

  // darsga qatnashgan sana
  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ required: true, type: Boolean })
  toAttend: boolean;

  @Prop({ required: false, type: String })
  description: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
