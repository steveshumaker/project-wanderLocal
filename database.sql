
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- experiences table creation
CREATE TABLE "experiences" (
	id SERIAL PRIMARY KEY,
	name varchar(50), -- name of the experience
	description varchar(250), -- general description from the user
	web_path varchar(255) null, -- yelp or google path
	photo_path varchar(100) null, -- this is now the md5 from the file sent to S3
	yelp_path varchar(250) null, -- this is going to be the yelp photo path
	rating varchar(5) null, -- yelp review count
	stars varchar(5) null, -- yelp star count
	location_desc VARCHAR(75), -- the city/state
	favorite BOOLEAN DEFAULT FALSE, -- this is new and implemented after the fact. also, other versions of SQL don't use booleans, so may need to adjust
	toggle_ext BOOLEAN DEFAULT TRUE, -- boolean, allows you to toggle the external data or not
	tags TEXT[], -- array to store experience tags
	user_id INT REFERENCES "user" -- user fk
);  