import React from "react";
import Search from "./components/Search/page";
import Table from "./components/Table";
import db from "./db/drizzle";
import { shopify_accounts } from "./db/schema";
import { count, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { Shopify_Account } from "../../drizzle/schema";
import Pagination from "./components/Pagination/page";

export interface ShopifyAccount {
  email: string;
  id: number;
  shopifyId: number;
  firstName: string | null;
  lastName: string | null;
  IsPWActivated: boolean;
  PWActivatedAt: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
}

type S = ShopifyAccount & Shopify_Account

async function countRecords() {
  try {
    const total = await db
      .select({ count: count() })
      .from(shopify_accounts)
    return total
  } catch (error) {
    console.log("Filed to get records")
  }
}



// TODO: handle reset search input value?
// using { [key: string]: string | string[] | undefined } for searchParms build throws an error
export default async function Home({ searchParams }: any) {

  function getParam(str: string) {
    if (!searchParams) {
      return ""
    }
    return searchParams[str as keyof typeof searchParams];
  };

  const searchEmail = getParam('email') as string
  // const page = getParam('page') ?? '1'
  const page = searchParams['page'] ?? '1'
  const PAGE_SIZE = 10;

  async function getCustomers(query: string | undefined): Promise<Shopify_Account[]> {
    //console.log(query)
    try {
      if (query && query.length) {
        const data = await db
          .select()
          .from(shopify_accounts)
          .where(eq(shopify_accounts.email, query ?? ''));
        return data as never as S[]
      }

      const data = await db
        .select()
        .from(shopify_accounts)
        .orderBy(desc(shopify_accounts.createdAt))
        .limit(PAGE_SIZE)
        .offset((page - 1) * PAGE_SIZE);
      return data as unknown as S[]
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error:", error.message)
        return []
      }
      console.log("Error generic:", error)
      return []
    }
  }

  const customers = await getCustomers(searchEmail)
  const [total] = await countRecords() ?? [{ count: 0 }]

  // TODO: INSTEAD of where = customer, includes? so users dont need to add full email
  return (
    <>
      <Search />
      <main>
        {searchEmail && <Link href="/">Clean</Link>}
        <Table customers={customers} searchFor={searchEmail as string} />
        <Pagination page={Number(page)} total={total.count} size={PAGE_SIZE as number} />

      </main>
    </>
  );
}
