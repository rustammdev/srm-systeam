import { Controller } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('company')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}
}
