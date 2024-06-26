import "dotenv/config";
import { asc, sql } from "drizzle-orm";
import db from "./drizzle";
import { shopify_accounts, users } from "./schema";
// @ts-ignore
import parseLinks from "parse-links";
import axios from "axios";
import {
  LinkHeader,
  ShopifyUser,
  UserProps,
} from "u@/lib/typesndefined";

// npx tsx src/app/db/seed.ts
const CUSTOMERS_URL = process.env.CUSTOMERS_URL!;

let arr: Array<UserProps> = [];
let paginationURLS: Array<string> = [];

/* Why use axios istead of native fetch?
 * R: Fetch with credentials attatched to the URL will throw an error.
 * https://github.com/elastic/kibana/issues/34847#issuecomment-486126329
 */
function fetchNextJson(url: string): any {
  let next = "";
  let linkHeader: LinkHeader = {};

  return axios
    .get(url)
    .then((response) => {
      linkHeader = parseLinks(
        //@ts-ignore
        response.headers.get("link")
      );

      if (!linkHeader?.next) {
        const finalSearch = paginationURLS.pop();
        const finalURl = `${CUSTOMERS_URL}&page_info=${finalSearch}`;
        return axios.get(finalURl).then((pars) => {
          arr.push(...pars.data.customers);
        });
      }

      const current_url = new URL(linkHeader.next);
      const search_params = current_url.searchParams;
      const id = search_params.get("page_info");
      if (!id) {
        console.log("Can't found page_info search param");
        return;
      }
      paginationURLS.push(id);
      next = `${CUSTOMERS_URL}&page_info=${id}`;
      return response.data;
    })
    .then((data: ShopifyUser) => {
      if (next) {
        arr.push(...data.customers);
        return fetchNextJson(next);
      } else {
        return arr;
      }
    })
    .catch(function (err) {
      console.log("error: " + err);
    });
}

async function main() {
  try {
    console.log("Init DB seeding");
    // const data = await db
    //   .select()
    //   .from(users)
    //   .orderBy(asc(users.createdAt));
    // console.log(data);

    const users = await fetchNextJson(CUSTOMERS_URL);
    console.log("u", users);

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
