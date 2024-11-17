import { Company } from 'src/modules/customer/schema/company.scheme';
import { Science } from 'src/modules/science/schema/science.schema';
import { Student } from 'src/modules/student/schema/student.scheme';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Group } from 'src/modules/group/schema/group.scheme';

export type PaymentDocument = HydratedDocument<Payment>;

enum status {
  paid = 'paid',
  unpaid = 'unpaid',
}

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  company: Company;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Student' })
  studentId: mongoose.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Group' })
  group: mongoose.Types.ObjectId;

  @Prop({ type: Date, required: true })
  dateOfPayment: Date;

  @Prop({ required: true, type: String, enum: status, default: status.unpaid })
  status: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
