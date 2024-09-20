import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from 'src/database/schema';

@Injectable()
export class AppService {
  constructor(
    @Inject('PG_CONNECTION') private connection: NodePgDatabase<typeof schema>,
  ) {}

  async getUsers() {
    return await this.connection.query.users.findMany();
  }
}
