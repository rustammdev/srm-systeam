import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Mongoose } from 'mongoose';
import { Company } from 'src/modules/customer/schema/company.scheme';

export type ArxivDocument = HydratedDocument<Arxiv>;

@Schema({ timestamps: true })
export class Arxiv {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  company: Company;
}

export const ArxivSchema = SchemaFactory.createForClass(Arxiv);
