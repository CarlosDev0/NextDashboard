import { addToWhitelist } from '@/app/lib/instantdb';

export async function POST(request: Request) {
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
    } else {
      return Response.json(
        { error: 'Failed to add user to whitelist' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error seeding user:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Default seed data for testing
export async function GET() {
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
