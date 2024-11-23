import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Mongoose } from 'mongoose';
import { Company } from 'src/modules/customer/schema/company.scheme';
import { Science } from 'src/modules/science/schema/science.schema';

export type WaitingDocument = HydratedDocument<Waiting>;

@Schema({ timestamps: true })
export class Waiting {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  company: Company;

  @Prop({ required: true, type: String })
  firstname: string;

  @Prop({ required: true, type: String })
  lastname: string;

  @Prop({ required: true, type: String })
  phoneNumber: string;

  @Prop({ required: true, type: String })
  science: string;

  @Prop({ required: true, type: String })
  description: string;
}

export const WaitingSchema = SchemaFactory.createForClass(Waiting);
