import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { Payment } from './payment';
import { PaymentsService } from './payments.service';

@Controller('payments')
@UseGuards(AuthGuard)
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Get(':id')
  async getPayment(@Param() params, @Res() response: Response) {
    try {
      const payment = await this.service.getPayment(params.id);
      if (payment) response.send(payment);
      else response.status(404).send({ message: 'payment not found' });
    } catch (e) {
      console.log(e);
      response.status(400).send(e);
    }
  }

  @Post()
  async addPayment(@Body() newPayment: Payment, @Res() response: Response) {
    try {
      const id = await this.service.addPayment(newPayment);
      response.header('Location', `/payments/${id}`);
      response.end();
    } catch (e) {
      console.log(e);
      response.status(400).send(e);
    }
  }
}
