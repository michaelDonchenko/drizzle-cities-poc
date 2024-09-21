CREATE TABLE IF NOT EXISTS "cities" (
	"id" uuid PRIMARY KEY NOT NULL,
	"city_name" varchar(255),
	"city_ascii" text,
	"lat" real,
	"lng" real,
	"country" text
);
