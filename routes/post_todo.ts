import type { Route } from "@endpts/types";
import pg from "pg";

// connect to the Neon database with the connection string we copied
const pool = new pg.Pool({
  connectionString: process.env.NEON_DB_CONNECTION_STRING,
  ssl: true, // use an encrypted connection
});

export default {
  method: "POST",
  path: "/todo",
  async handler(req) {

    const {name, description} = await req.json();
    const text = 'INSERT INTO todo(name, description, done) VALUES($1, $2, FALSE) RETURNING *'
    const values = [name, description];

    const res = await pool.query(text, values);

    return new Response(null, {
        status: 200
      })
  },
} satisfies Route;