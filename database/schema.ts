import * as p from "drizzle-orm/pg-core";

//Users table
export const users = p.pgTable("users", {
  id: p.uuid("id").primaryKey().defaultRandom(),
  email: p.text("email").notNull().unique(),
  createdAt: p.timestamp("createdAt").defaultNow()
});

//Chats Table
export const chats = p.pgTable("chats", {
  id: p.uuid("id").primaryKey().defaultRandom(),
  user_id: p.integer("user_id").notNull().references(() => users.id),
  message: p.text("message"),
  response: p.text("response"),
  createdAt: p.timestamp("createdAt").defaultNow()
});

//Analytics Table
export const analytics = p.pgTable("analytics", {
  id: p.uuid("id").primaryKey().defaultRandom(),
  user_id: p.integer("user_id").notNull().references(() => users.id),
  metrics: p.text("metrics"),
  value: p.jsonb("value"),
  createdAt: p.timestamp("createdAt").defaultNow()
});

//Create a bible table
export const bible = p.pgTable("bible", {
  id: p.uuid("id").primaryKey().defaultRandom(),
  book: p.text("book"),
  chapter: p.integer("chapter"),
  verse: p.integer("verse"),
  text: p.text("text")
});

//Cron jobs
export const cronJobs = p.pgTable("cronJobs", {
  id: p.uuid("id").primaryKey().defaultRandom(),
  user_id: p.integer("user_id").notNull().references(() => users.id),
  status: p.text("status"),
  job_id: p.text("job_id")
});

// //Define relations
// export const userRelations = relations(users, ({ many }) => ({
//   usersToTables: many("usersToTables")
// }));