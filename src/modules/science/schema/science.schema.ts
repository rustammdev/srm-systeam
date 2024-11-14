import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from 'src/modules/customer/schema/company.scheme';
import { Teacher } from 'src/modules/teacher/schema/teacher.scheme';

export type ScienceDocument = HydratedDocument<Science>;

@Schema({ timestamps: true })
export class Science {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  company: Company;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' })
  teacher: Teacher;

  @Prop({ required: true, unique: true, type: String })
  science: string;

  @Prop({ required: true, type: String })
  price: string;

  // davomiylig
  @Prop({ required: true, type: String })
  term: string;
}

export const ScienceSchema = SchemaFactory.createForClass(Science);
