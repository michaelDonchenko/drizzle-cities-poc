import {
  pgTable,
  serial,
  text,
  uuid,
  varchar,
  real,
} from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
});

export const cities = pgTable('cities', {
  id: uuid('id').primaryKey(),
  city_name: varchar('city_name', { length: 255 }),
  city_ascii: text('city_ascii'),
  lat: real('lat'),
  lng: real('lng'),
  country: text('country'),
});

export type NewCity = InferInsertModel<typeof cities>;
export type SelectedCity = InferSelectModel<typeof cities>;
