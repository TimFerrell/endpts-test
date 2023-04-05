import type { Route } from "@endpts/types";
import pg from "pg";

// connect to the Neon database with the connection string we copied
const pool = new pg.Pool({
  connectionString: process.env.NEON_DB_CONNECTION_STRING,
  ssl: true, // use an encrypted connection
});

export default {
  method: "GET",
  path: "/todo",
  async handler(req) {
   const filterDone = req.params.filterDone ? true : false;
    console.log(req.params, filterDone);
    const { rows: todos } = await pool.query(
      "SELECT name, description, done from todo where done = $1",
      [filterDone]
    );

    return Response.json(todos, { status: 200 });
  },
} satisfies Route;