import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from './schema/payment.scheme';
import { Model } from 'mongoose';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(@InjectModel(Payment.name) private paymentModel: Model<Payment>) {}

  // Get all payments, all company
  async getAll(id: string) {
    return await this.paymentModel.find({ company: id });
  }

  // get payments spesific group
  async getPaymentsWithoutGroupId(id: string, group: string) {
    return await this.paymentModel.find({ company: id, group });
  }

  // Update payment
  async update(id: string, updatePayload: UpdatePaymentDto) {
    try {
      const payment = await this.paymentModel.findByIdAndUpdate(
        id,
        { $set: updatePayload },
        { new: true },
      );

      if (!payment)
        throw new HttpException("Payment not found or doesn't updated.", HttpStatus.NOT_FOUND);
      return payment;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
