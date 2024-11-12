import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from 'src/modules/customer/schema/company.scheme';
import { Group } from 'src/modules/group/schema/group.scheme';

export type StudentDocument = HydratedDocument<Student>;

@Schema({ timestamps: true })
export class Student {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  company: Company;

  @Prop({ required: true, type: String })
  firstname: string;

  @Prop({ required: true, type: String })
  lastname: string;

  @Prop({ required: true, type: String })
  phoneNumber: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Group' })
  groupId: [Group];
}

export const StudentSchema = SchemaFactory.createForClass(Student);