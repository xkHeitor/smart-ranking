import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

@Injectable()
export default class Environments {
  readonly PORT: number;
  constructor() {
    config();
    this.PORT = Number(process.env.PORT);
  }

  getDbConnection(): string {
    return process.env.DB_CONNECT_MONGO;
  }
}
