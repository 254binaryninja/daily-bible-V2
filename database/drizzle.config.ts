import "dotenv/config";
import { defineConfig } from "drizzle-kit";

// @ts-nocheck
export default defineConfig({
  out: "migrations",
  schema: "schema.ts",
  dialect: "postgresql"
});
