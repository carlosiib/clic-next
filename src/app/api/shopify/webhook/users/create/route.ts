// Prevents this route's response from being cached
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { shopify_accounts } from "../../../../../db/schema";
import db from "../../../../../db/drizzle";

// api/shopify/webhook/users/create
//shopify customer: https://shopify.dev/docs/api/admin-rest/2024-01/resources/customer#post-customers
// Develop testing: ngrok http 3000
export async function POST(request: Request) {
  try {
    const { id, email, first_name, last_name, state } =
      await request.json();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Webhook user create payload is error",
        },
        { status: 400 }
      );
    }

    await db.insert(shopify_accounts).values({
      shopifyId: id,
      firstName: first_name ?? "",
      lastName: last_name ?? "",
      IsPWActivated: state === "enabled" ? true : false,
      email,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id,
          email,
          state,
        },
        error: null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("FAILED SHOPIFY WEBHOOK CREATE", error);
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
