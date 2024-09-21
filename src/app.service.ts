import { Inject, Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
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

  async getCitiesWithUsers() {
    const result = await this.connection
      .select({
        id: schema.cities.id,
        city_name: schema.cities.city_name,
        city_ascii: schema.cities.city_ascii,
        lat: schema.cities.lat,
        lng: schema.cities.lng,
        country: schema.cities.country,
        user_count:
          sql<number>`count(distinct ${schema.userCities.user_id})`.as(
            'user_count',
          ),
      })
      .from(schema.cities)
      .innerJoin(
        schema.userCities,
        eq(schema.cities.id, schema.userCities.city_id),
      )
      .groupBy(schema.cities.id)
      .having(sql`count(distinct ${schema.userCities.user_id}) > 0`);

    return result;
  }
}
