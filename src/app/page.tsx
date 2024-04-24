import React from "react";
import Search from "./components/Search/page";
import Table from "./components/Table/page";
import db from "./db/drizzle";
import { shopify_accounts } from "./db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";


// TODO: handle reset search input value?
export default async function Home({ searchParams }: { [key: string]: string | string[] | undefined }) {

  function getParam(str: string) {
    if (!searchParams) {
      return ""
    }
    return searchParams[str as keyof typeof searchParams];
  };

  const searchEmail = getParam('email') as string
  // console.log({ searchEmail })

  async function getCustomers(query: string | undefined) {
    console.log(query)
    try {
      if (query && query.length) {
        const data = await db
          .select()
          .from(shopify_accounts)
          .where(eq(shopify_accounts.email, query ?? ''));
        return data
      }

      const data = await db
        .select()
        .from(shopify_accounts)
        .orderBy(desc(shopify_accounts.createdAt))
        .limit(10);
      return data
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


  // TODO: INSTEAD of where = customer, includes? so users dont need to add full email
  return (
    <>
      <Search />
      <main>
        {searchEmail && <Link href="/">Clean</Link>}
        <Table customers={customers} title='Customers' searchFor={searchEmail} />
      </main>
    </>
  );
}
