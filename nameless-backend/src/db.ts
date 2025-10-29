import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool: Pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});

pool
  .query("SELECT NOW()")
  .then((res) => {
    console.log("✅ Connected to PostgreSQL at", res.rows[0].now);
  })
  .catch((err) => {
    console.error("❌ Database Connection failed:", err.message);
    process.exit(1);
  });

pool.on("error", (err) => {
  console.error("Database error:", err);
  process.exit(-1);
});
