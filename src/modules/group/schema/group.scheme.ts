import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Mongoose } from 'mongoose';
import { Company } from 'src/modules/customer/schema/company.scheme';
import { Science } from 'src/modules/science/schema/science.schema';
import { Teacher } from 'src/modules/teacher/schema/teacher.scheme';

export type GroupDocument = HydratedDocument<Group>;

enum status {
  active,
  freez,
  complate,
}

@Schema({ timestamps: true })
export class Group {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  company: Company;

  @Prop({ required: true, unique: true, type: String })
  name: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Science' })
  science: Science;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' })
  teacher: Teacher;

  // Dars kunlari (masalan: [1,3,5] - Dush/Chor/Juma)
  @Prop({ type: [Number], required: true })
  weekDays: number[];

  // Dars vaqti
  @Prop({ required: true, type: Object })
  time: {
    start: string; // "14:30"
    end: string; // "15:50"
  };

  @Prop({
    required: true,
    type: String,
    enum: status,
    default: status.active,
  })
  status: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
