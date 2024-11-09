import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Student } from './student.scheme';
import { Group } from './group.scheme';
import { Science } from './science.scheme';

export type PaymentDocument = HydratedDocument<Payment>;

enum status {
  paid,
  unpaid,
}

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Student' })
  studentId: Student;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Science' })
  science: Science;

  @Prop({ type: String })
  dateOfPayment: Date;

  @Prop({ required: true, type: String, enum: status, default: status.unpaid })
  status: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
