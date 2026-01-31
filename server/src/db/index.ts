import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString =
  Bun.env.DATABASE_URL || "postgres://jtube:jtube@localhost:5432/jtube";

const client = postgres(connectionString);
export const db = drizzle(client, { schema });
