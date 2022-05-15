import { Controller, Get, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Get(':id')
  getUser(@Param() params) {
    console.log(params);
    return 'ok';
  }
}
