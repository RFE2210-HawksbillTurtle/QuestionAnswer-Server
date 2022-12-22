SELECT 'CREATE DATABASE questiontest'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname='questiontest')\gexec

\connect questiontest;

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  product_id int,
  body VARCHAR(255),
  date_written int,
  asker_name VARCHAR(50),
  asker_email VARCHAR(100),
  reported int,
  helpful int
);

CREATE TABLE IF NOT EXISTS answers(
  id SERIAL PRIMARY KEY,
  question_id int,
  body VARCHAR(255),
  date_written VARCHAR(50),
  answerer_name VARCHAR(50),
  answerer_email VARCHAR(100),
  reported int,
  helpful int,
  CONSTRAINT fk_question
    FOREIGN KEY(question_id)
      REFERENCES questions(id)
)