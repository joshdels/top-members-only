require("dotenv").config();
const { Pool } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  full_name VARCHAR(255),
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  membership_status VARCHAR(255) DEFAULT 'inactive'
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER,
  message TEXT,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (
  full_name,
  username,
  password,
  membership_status
)
VALUES
  ('Alice Smith', 'alice_s', 'hashed_password_123', 'active'),
  ('Bob Jones', 'bob_j', 'hashed_password_456', 'inactive'),
  ('Charlie Brown', 'charlie_b', 'hashed_password_789', 'active')
ON CONFLICT (username) DO NOTHING;

INSERT INTO messages (user_id, message)
VALUES
  ((SELECT id FROM users WHERE username = 'alice_s'),
  'Hello world! This is Alices first long text message string.'),

  ((SELECT id FROM users WHERE username = 'bob_j'),
  'Hey there, Bob here. Just checking out the new message board system.'),

  ((SELECT id FROM users WHERE username = 'charlie_b'),
  'Good grief, I love coding in Node.js and PostgreSQL!');

`;

async function main() {
  console.log("Seeding...");

  const client = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Done");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await client.end();
  }
}

main();
