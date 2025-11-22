require("dotenv").config();
const { createPool } = require("mysql2/promise");

const db = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testDB() {
  try {
    const conn = await db.getConnection();
    console.log("✅ MySQL connected successfully!");
    conn.release();
  } catch (error) {
    console.error("❌ MySQL connection failed: ", error.message);
    process.exit(1);
  }
}
module.exports = { db, testDB };
