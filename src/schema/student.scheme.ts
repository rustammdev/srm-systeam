import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Group } from './group.scheme';

export type StudentDocument = HydratedDocument<Student>;

@Schema({ timestamps: true })
export class Student {
  @Prop({ required: true, type: String })
  firstname: string;

  @Prop({ required: true, type: String })
  lastname: string;

  @Prop({ required: true, type: String })
  phoneNumber: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Group' })
  groupId: Group;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
