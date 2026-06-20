require("dotenv").config();
const { Pool } = require("pg");

if (process.env.NODE_ENV === "production") {
  console.log("Production")

  module.exports = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    }
  })
} else {
  console.log("Development")

  module.exports = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })
}
