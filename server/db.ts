import { drizzle } from "drizzle-orm/neon-serverless";
import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import * as schema from "../shared/schema";

// Initialize database connection
const sql: NeonQueryFunction<false, false> = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql as any, { schema });