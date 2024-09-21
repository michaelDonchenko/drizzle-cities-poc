import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

interface CSVCity {
  city: string;
  city_ascii: string;
  lat: string;
  lng: string;
  country: string;
  iso2: string;
  iso3: string;
  admin_name: string;
  capital: string;
  population: string;
  id: string;
}

@Injectable()
export class DatabaseService {
  constructor(
    @Inject('PG_CONNECTION')
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async insertCSVData(data: CSVCity[]) {
    const cities = data.map((csvCity) => ({
      city_name: csvCity.city,
      city_ascii: csvCity.city_ascii,
      lat: Number(csvCity.lat),
      lng: Number(csvCity.lng),
      country: csvCity.country,
    }));


    await this.db.insert(schema.cities).values(cities as schema.SelectedCity[]);
  }
}
