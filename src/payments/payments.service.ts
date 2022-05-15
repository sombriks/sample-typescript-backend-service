import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/config/database.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly db: DatabaseService) {}
}
