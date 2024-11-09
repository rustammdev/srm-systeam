import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Mongoose } from 'mongoose';
import { Science } from './science.scheme';
import { Teacher } from './teacher.scheme';

export type GroupDocument = HydratedDocument<Group>;

enum status {
  active,
  freez,
  complate,
}

@Schema({ timestamps: true })
export class Group {
  @Prop({ required: true, unique: true, type: String })
  name: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Science' })
  science: Science;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' })
  teacher: Teacher;

  @Prop({ required: true, type: Date })
  start_date: string;

  @Prop({ required: true, type: Date })
  end_date: string;

  @Prop({
    required: true,
    type: String,
    enum: status,
    default: status.active,
  })
  status: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
