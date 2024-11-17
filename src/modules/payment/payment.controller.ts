import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Roles } from 'src/common/guard/decorator/roles.decorator';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('company')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  // Get payments
  @Get('payment')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async getPayments(@Req() req: any) {
    const id = req.user['companyId'] ?? req.user['sub'];
    return this.paymentService.getAll(id);
  }

  // Update payment
  @Put('payment/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async updatePayment(
    @Body(new ValidationPipe()) paymentPayload: UpdatePaymentDto,
    @Param('id') id: string,
  ) {
    return this.paymentService.update(id, paymentPayload);
  }
}
