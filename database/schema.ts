import * as p from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users table
export const users = p.pgTable("users", {
  id: p.uuid("id").primaryKey().defaultRandom(),
  name: p.text("name").notNull(),
  email: p.text("email").notNull().unique(),
  createdAt: p.timestamp("createdAt").defaultNow()
});

// Chats table
export const chats = p.pgTable("chats", {
  id: p.uuid("id").primaryKey().defaultRandom(),
  user_id: p.uuid("user_id").notNull().references(() => users.id),
  message: p.text("message"),
  response: p.text("response"),
  createdAt: p.timestamp("createdAt").defaultNow()
});

// Analytics table
export const analytics = p.pgTable("analytics", {
  id: p.uuid("id").primaryKey().defaultRandom(),
  user_id: p.uuid("user_id").notNull().references(() => users.id),
  metrics: p.text("metrics"),
  value: p.jsonb("value"),
  createdAt: p.timestamp("createdAt").defaultNow()
});

// Bible table
export const bible = p.pgTable("bible", {
  id: p.uuid("id").primaryKey().defaultRandom(),
  book: p.text("book"),
  chapter: p.integer("chapter"),
  verse: p.integer("verse"),
  text: p.text("text")
});

// Cron jobs table
export const cronJobs = p.pgTable("cronJobs", {
  id: p.uuid("id").primaryKey().defaultRandom(),
  user_id: p.uuid("user_id").notNull().references(() => users.id),
  status: p.text("status"),
  job_id: p.text("job_id")
});

// Embeddings table
export const embeddings = p.pgTable("embeddings", {
  id: p.uuid("id").primaryKey().defaultRandom(),
  user_id: p.uuid("user_id").notNull().references(() => users.id),
  content: p.text("content"),
  embedding: p.vector("embedding", { dimensions: 768 }), // 768-dimensional vector
  metadata: p.jsonb("metadata"),
  createdAt: p.timestamp("createdAt").defaultNow()
});

// Define relations for the Users table
export const userRelations = relations(users, ({ many }) => ({
  chats: many(chats),
  analytics: many(analytics),
  cronJobs: many(cronJobs)
}));

// Define relations for the Chats table
export const chatRelations = relations(chats, ({ one }) => ({
  user: one(users, {
    fields: [chats.user_id],
    references: [users.id]
  })
}));

// Define relations for the Analytics table
export const analyticsRelations = relations(analytics, ({ one }) => ({
  user: one(users, {
    fields: [analytics.user_id],
    references: [users.id]
  })
}));

// Define relations for the CronJobs table
export const cronJobRelations = relations(cronJobs, ({ one }) => ({
  user: one(users, {
    fields: [cronJobs.user_id],
    references: [users.id]
  })
}));
