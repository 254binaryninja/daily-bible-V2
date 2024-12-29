import { SQLDatabase } from "encore.dev/storage/sqldb";
import { drizzle } from "drizzle-orm/node-postgres";

// Create SQLDatabase instance with migrations configuration
const DB = new SQLDatabase("test", {
  migrations: {
    path: "migrations",
    source: "drizzle"
  }
});

// Initialize Drizzle ORM with the connection string
export const db = drizzle(DB.connectionString);

//Export DataBase


