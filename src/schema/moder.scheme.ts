import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from './company.scheme';

export type ModerDocument = HydratedDocument<Moder>;

@Schema({ timestamps: true })
export class Moder {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  })
  company: mongoose.Types.ObjectId;

  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  username: string;

  @Prop({
    required: true,
    type: String,
  })
  password: string;
}

export const ModerSchema = SchemaFactory.createForClass(Moder);
