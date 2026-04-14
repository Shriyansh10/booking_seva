import pg from "pg";
const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "booking_seva",
  max: 20,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
});
export default pool;
