// Prevents this route's response from being cached
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { shopify_accounts } from "../../../../../db/schema";
import db from "../../../../../db/drizzle";
import { z } from "zod";

const payload = z.object({
  id: z.number(),
  email: z.string().email(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  state: z.enum([
    "enabled",
    "disabled",
    "invited",
    "declined",
  ]),
});
// api/shopify/webhook/users/create
//shopify customer: https://shopify.dev/docs/api/admin-rest/2024-01/resources/customer#post-customers
// Develop testing: ngrok http 3000
export async function POST(request: Request) {
  try {
    const req = await request.json();

    const data = payload.parse(req);

    console.log(data);

    // await db.insert(shopify_accounts).values({
    //   shopifyId: data.id,
    //   firstName: data.first_name ?? "",
    //   lastName: data.last_name ?? "",
    //   IsPWActivated:
    //     data.state === "enabled" ? true : false,
    //   email: data.email,
    // });

    return NextResponse.json(
      {
        success: true,
        data,
        error: null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("FAILED SHOPIFY WEBHOOK CREATE", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: `Invalid payload shape: ${error.issues[0].message}`,
        },
        { status: 400 }
      );
    }
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: error.message,
        },
        { status: 400 }
      );
    }
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
