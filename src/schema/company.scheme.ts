import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

enum status {
  active,
  freez,
  blocked,
}

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true, unique: true, type: String })
  companyName: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({
    required: false,
    type: String,
    enum: status,
    default: status.active,
  })
  status: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
