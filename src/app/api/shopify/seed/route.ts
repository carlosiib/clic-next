// Prevents this route's response from being cached
export const dynamic = "force-dynamic";

import "dotenv/config";
import { NextResponse } from "next/server";
// @ts-ignore
import parseLinks from "parse-links";
import axios from "axios";
import {
  LinkHeader,
  ShopifyUser,
  UserProps,
} from "u@/lib/typesndefined";

// ONLY FOR DEVELOPMENT
// api/shopify/seed
const CUSTOMERS_URL = process.env.CUSTOMERS_URL!;

let arr: ShopifyUser[] = [];
let paginationURLS: Array<string> = [];

/* Why use axios istead of native fetch?
 * R: Fetch with credentials attatched to the URL will throw an error.
 * https://github.com/elastic/kibana/issues/34847#issuecomment-486126329
 */
async function getAllCustomers(
  url: string
): Promise<void | ShopifyUser[]> {
  let next = "";
  let linkHeader: LinkHeader = {};
  try {
    const res = await axios.get(url);

    linkHeader = parseLinks(
      //@ts-ignore
      res.headers.get("link")
    );
    console.log("linkHeader", linkHeader);

    if (!linkHeader?.next) {
      console.log("last");
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

    const d2 = await res.data;
    arr.push(...d2.customers);
    await getAllCustomers(next);
    return arr;
  } catch (error) {
    console.log(
      "error loading all shopify users: " + error
    );
  }
}

export async function POST() {
  try {
    const customers = await getAllCustomers(CUSTOMERS_URL);
    // console.log("******");
    // console.log("customers", customers);

    if (customers?.length === 0) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Customer array is empty",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        length: customers?.length,
        data: customers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("FAILED SHOPIFY SEED", error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: error,
      },
      { status: 400 }
    );
  }
}
