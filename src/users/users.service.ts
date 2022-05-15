import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/config/database.service';
import { User } from './user';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async addUser(newUser: User): Promise<string> {
    const knex = this.db.getConnection();
    await knex('users').insert({
      ...newUser,
      created_at: new Date(),
    });
    return newUser.id;
  }

  async getUser(id: string): Promise<User> {
    const knex = this.db.getConnection();
    return await knex('users').where({ id }).first();
  }
}
