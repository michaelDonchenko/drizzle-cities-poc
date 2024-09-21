import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

@Injectable()
export class DatabaseService {
  constructor(
    @Inject('PG_CONNECTION')
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async insertCSVData(data: any[]) {
    

    // await this.db.insert(schema.cities).values(data);
  }
}
