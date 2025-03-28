import bcrypt from "bcryptjs";
import { db, VercelPoolClient } from "@vercel/postgres";
import {
  invoices,
  customers,
  revenue,
  users,
} from "../../lib/placeholder-data";
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
  //return Response.json({
  //  message:
  //    'Uncomment this file and remove this line. You can delete this file when you are finished.',
  //});
  try {
    const client = await db.connect(); // 🔥 Move connection inside function

    await client.sql`BEGIN`;
    await seedUsers(client);
    await seedCustomers(client);
    await seedInvoices(client);
    await seedRevenue(client);
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    //await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
//const client = await db.connect();

async function seedUsers(client: VercelPoolClient) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
     CREATE TABLE IF NOT EXISTS users (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email TEXT NOT NULL UNIQUE,
       password TEXT NOT NULL
     );
   `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
         INSERT INTO users (id, name, email, password)
         VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
         ON CONFLICT (id) DO NOTHING;
       `;
    })
  );

  return insertedUsers;
}

async function seedInvoices(client: VercelPoolClient) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
     CREATE TABLE IF NOT EXISTS invoices (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       customer_id UUID NOT NULL,
       amount INT NOT NULL,
       status VARCHAR(255) NOT NULL,
       date DATE NOT NULL
     );
   `;

  const insertedInvoices = await Promise.all(
    invoices.map(
      (invoice) => client.sql`
         INSERT INTO invoices (customer_id, amount, status, date)
         VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
         ON CONFLICT (id) DO NOTHING;
       `
    )
  );

  return insertedInvoices;
}

async function seedCustomers(client: VercelPoolClient) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
     CREATE TABLE IF NOT EXISTS customers (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       image_url VARCHAR(255) NOT NULL
     );
   `;

  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => client.sql`
         INSERT INTO customers (id, name, email, image_url)
         VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
         ON CONFLICT (id) DO NOTHING;
       `
    )
  );

  return insertedCustomers;
}

async function seedRevenue(client: VercelPoolClient) {
  await client.sql`
     CREATE TABLE IF NOT EXISTS revenue (
       month VARCHAR(4) NOT NULL UNIQUE,
       revenue INT NOT NULL
     );
   `;

  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) => client.sql`
         INSERT INTO revenue (month, revenue)
         VALUES (${rev.month}, ${rev.revenue})
         ON CONFLICT (month) DO NOTHING;
       `
    )
  );

  return insertedRevenue;
}
