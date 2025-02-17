import { db, VercelPoolClient } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Seeding is disabled in production" },
      { status: 403 }
    );
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "Missing database connection." },
      { status: 500 }
    );
  }
  try {
    const client = await db.connect();
    return Response.json(await listInvoices(client));
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
async function listInvoices(client: VercelPoolClient) {
  const data = await client.sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

  return data.rows;
}
