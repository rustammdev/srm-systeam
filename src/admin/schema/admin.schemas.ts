import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, mongo } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ timestamps: true })
export class Admin {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: mongoose.Schema.ObjectId, ref: 'Admin' })
  owner: mongoose.Types.ObjectId;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
