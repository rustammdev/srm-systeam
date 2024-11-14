import { Science } from 'src/modules/science/schema/science.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from 'src/modules/customer/schema/company.scheme';

export type TeacherDocument = HydratedDocument<Teacher>;

@Schema({ timestamps: true })
export class Teacher {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  company: Company;

  @Prop({ required: true, type: String })
  firstname: string;

  @Prop({ required: true, type: String })
  lastname: string;

  @Prop({ required: true, type: String })
  phoneNumber: string;

  @Prop({ required: true, type: String })
  description: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
