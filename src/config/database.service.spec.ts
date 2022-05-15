import { Test, TestingModule } from '@nestjs/testing';
import { unlinkSync } from 'fs';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    databaseService = app.get(DatabaseService);
  });

  describe('general', () => {
    it(' it should connect into database', async () => {
      const knex = databaseService.getConnection();
      const result = await knex.raw('select 1 + 1');
      expect([{ '1 + 1': 2 }]).toEqual(result);
    });
  });

  afterAll(async () => {
    databaseService
      .getConnection()
      .destroy()
      .then(() => unlinkSync('./test.sqlite3'));
  });
});
