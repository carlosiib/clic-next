import {
  pgTable,
  serial,
  integer,
  varchar,
  boolean,
  timestamp,
  unique,
  text,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { type InferSelectModel } from "drizzle-orm";

export const shopifyAccounts = pgTable("shopify_accounts", {
  id: serial("id").primaryKey().notNull(),
  shopifyId: integer("shopify_id").notNull(),
  firstName: varchar("first_name", {
    length: 30,
  }).notNull(),
  lastName: varchar("last_name", { length: 30 }),
  email: varchar("email", { length: 40 }).notNull(),
  isPwActivated: boolean("is_pw_activated")
    .default(false)
    .notNull(),
  pwActivatedAt: timestamp("pw_activated_at", {
    mode: "string",
  }),
  createdAt: timestamp("created_at", { mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }),
});

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey().notNull(),
    username: varchar("username", { length: 30 }).notNull(),
    email: varchar("email", { length: 40 }).notNull(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }),
  },
  (table) => {
    return {
      usersEmailUnique: unique("users_email_unique").on(
        table.email
      ),
    };
  }
);

export type Shopify_Account = InferSelectModel<
  typeof shopifyAccounts
>;
