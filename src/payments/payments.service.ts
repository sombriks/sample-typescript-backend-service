import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/config/database.service';
import { Payment } from './payment';

@Injectable()
export class PaymentsService {
  constructor(private readonly db: DatabaseService) {}

  async getPayment(id: string): Promise<Payment> {
    const knex = this.db.getConnection();
    return await knex('payments').where({ id }).first();
  }

  async addPayment(newPayment: Payment): Promise<string> {
    const knex = this.db.getConnection();
    await knex('payments').insert({ ...newPayment, created_at: new Date() });
    return newPayment.id;
  }
}
