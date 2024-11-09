import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Student } from './student.scheme';
import { Group } from './group.scheme';

export type ScienceDocument = HydratedDocument<Science>;

@Schema({ timestamps: true })
export class Science {
  @Prop({ required: true, type: String })
  science: string;

  @Prop({ required: true, type: String })
  price: string;

  // davomiylig
  @Prop({ required: true, type: String })
  term: string;
}

export const ScienceSchema = SchemaFactory.createForClass(Science);
