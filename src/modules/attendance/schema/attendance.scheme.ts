import { Company } from 'src/modules/customer/schema/company.scheme';
import { Student } from 'src/modules/student/schema/student.scheme';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Mongoose } from 'mongoose';
import { Group } from 'src/modules/group/schema/group.scheme';

export type AttendanceDocument = HydratedDocument<Attendance>;

// Yo'qlama
@Schema({ timestamps: true })
export class Attendance {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  company: mongoose.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Student' })
  student: mongoose.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Group' })
  group: mongoose.Types.ObjectId;

  // darsga qatnashgan sana
  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ required: true, type: Boolean, default: false })
  toAttend: boolean;

  @Prop({ required: false, type: String, default: '' })
  description: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
