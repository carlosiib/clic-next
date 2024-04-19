import {
  text,
  boolean,
  pgTable,
  serial,
  timestamp,
  integer,
  varchar,
} from "drizzle-orm/pg-core";

// push changes to neon -> npx drizzle-kit push:pg
// create schema .sql file -> npm run db:generate
// pull changes locally from neon -> npm run db:introspect
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 30 }).notNull(),
  email: varchar("email", { length: 40 })
    .notNull()
    .unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const shopify_accounts = pgTable(
  "shopify_accounts",
  {
    id: serial("id").primaryKey(),
    shopifyId: integer("shopify_id").notNull().unique(),
    firstName: varchar("first_name", {
      length: 140,
    }),
    lastName: varchar("last_name", { length: 140 }),
    email: varchar("email", { length: 80 }).notNull(),
    IsPWActivated: boolean("is_pw_activated")
      .default(false)
      .notNull(),
    PWActivatedAt: timestamp("pw_activated_at"),
    createdAt: timestamp("created_at")
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at"),
  }
);
