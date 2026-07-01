import { addToWhitelist } from '@/app/lib/instantdb';
import { authOptions } from '@/app/lib/auth-options';
import { getServerSession } from 'next-auth';

async function requireAdmin() {
  if (process.env.NODE_ENV === 'production') {
    return { ok: false as const, status: 403, message: 'Not available in production' };
  }

  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  if (!session || role !== 'admin') {
    return { ok: false as const, status: 401, message: 'Admin session required' };
  }

  return { ok: true as const };
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return Response.json({ error: auth.message }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { email, name, role } = body;

    if (!email || !name) {
      return Response.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    const success = await addToWhitelist(email, name, role || 'user');

    if (success) {
      return Response.json({ success: true, message: 'User added to whitelist' });
    }

    return Response.json(
      { error: 'Failed to add user to whitelist' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error seeding user:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return Response.json({ error: auth.message }, { status: auth.status });
  }

  const testUsers = [
    { email: 'your-email@gmail.com', name: 'Test User', role: 'admin' },
  ];

  const results = [];
  for (const user of testUsers) {
    const success = await addToWhitelist(user.email, user.name, user.role);
    results.push({ ...user, success });
  }

  return Response.json({ results });
}
