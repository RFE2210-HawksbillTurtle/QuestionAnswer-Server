CREATE DATABASE questiontest;

\connect questiontest;

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  product_id int,
  body VARCHAR(255),
  date_written int,
  asker_name VARCHAR(50),
  asker_email VARCHAR(100),
  reported int,
  helpful int
);