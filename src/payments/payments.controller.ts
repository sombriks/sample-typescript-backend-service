import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Payment } from './payment';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Get(':id')
  getPayment(@Param() params): Payment {
    return {
      id: params.id,
      amount: 100,
      currency: 'USD',
      description: 'new payment',
      user_id: 'ididid',
    };
  }

  @Post()
  addPayment(@Body() newPayment: Payment) {
    console.log(newPayment);
  }
}
