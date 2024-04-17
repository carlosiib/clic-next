import { asc, sql } from "drizzle-orm";
import db from "./drizzle";
import { shopify_accounts, users } from "./schema";

// npx tsx src/app/db/seed.ts
async function main() {
  try {
    console.log("Init DB seeding");
    const data = await db
      .select()
      .from(users)
      .orderBy(asc(users.createdAt));
    console.log(data);

    // await db.delete(shopify_accounts);

    // await db.insert(users).values([
    //   {
    //     email: "foo+1@gmail.com",
    //     password: "foo",
    //     username: "foo",
    //   },
    // ]);

    // await db.insert(shopify_accounts).values([
    //   {
    //     email: "foo@gmail.com",
    //     firstName: "foo",
    //     shopifyId: 111,
    //   },
    // ]);

    // slq template syntax -> prevent sql injection
    // const user1 = "foo";
    // const u = await db.execute(
    //   sql`select ${users.username} from ${users} where ${users.username} = 'foo'`
    // );
    // console.log(u.rows[0].text);
    console.log("Finish DB seeding");
  } catch (error) {
    console.log("FAILED: DB seeding", error);
  }
}
main();
