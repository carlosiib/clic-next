CREATE TABLE IF NOT EXISTS "shopify_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"shopify_id" integer NOT NULL,
	"first_name" varchar(30) NOT NULL,
	"last_name" varchar(30),
	"email" varchar(40) NOT NULL,
	"is_pw_activated" boolean DEFAULT false NOT NULL,
	"pw_activated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(30) NOT NULL,
	"email" varchar(40) NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
