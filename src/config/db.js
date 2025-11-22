require("dotenv").config();
const { createPool } = require("mysql2/promise");
const fs = require("fs");

const db = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    ca: fs.readFileSync("./src/aiven-ca.pem"),
  },
});

async function testDB() {
  try {
    const conn = await db.getConnection();
    console.log("✅ MySQL connected successfully to Aiven!");
    conn.release();
  } catch (error) {
    console.error("❌ MySQL connection failed:", error);
    process.exit(1);
  }
}

module.exports = { db, testDB };
