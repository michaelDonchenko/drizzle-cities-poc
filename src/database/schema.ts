import {
  pgTable,
  serial,
  text,
  uuid,
  varchar,
  real,
  integer,
} from 'drizzle-orm/pg-core';
import { InferSelectModel, relations } from 'drizzle-orm';

export type SelectedCity = InferSelectModel<typeof cities>;

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
});

export const cities = pgTable('cities', {
  id: uuid('id').primaryKey().defaultRandom(),
  city_name: varchar('city_name', { length: 255 }),
  city_ascii: text('city_ascii'),
  lat: real('lat'),
  lng: real('lng'),
  country: text('country'),
});

export const usersRelations = relations(users, ({ many }) => ({
  userCities: many(userCities),
}));

export const citiesRelations = relations(cities, ({ many }) => ({
  userCities: many(userCities),
}));

export const userCities = pgTable('user_cities', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id')
    .notNull()
    .references(() => users.id),
  city_id: uuid('city_id')
    .notNull()
    .references(() => cities.id),
});

export const userCitiesRelations = relations(userCities, ({ one }) => ({
  user: one(users, {
    fields: [userCities.user_id],
    references: [users.id],
  }),
  city: one(cities, {
    fields: [userCities.city_id],
    references: [cities.id],
  }),
}));
