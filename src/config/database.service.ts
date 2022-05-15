import Knex from 'knex';

import { Injectable } from '@nestjs/common';

import * as config from '../../knexfile';

@Injectable()
export class DatabaseService {
  private readonly _knex;

  constructor() {
    console.log(`We are in ${process.env.NODE_ENV} mode!`);
    const cfg = { ...config[process.env.NODE_ENV] };
    this._knex = Knex(cfg);
    this._knex.migrate.latest();
  }

  getConnection() {
    return this._knex;
  }
}
