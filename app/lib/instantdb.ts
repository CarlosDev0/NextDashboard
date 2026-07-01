import { init, id } from '@instantdb/admin';

// Lazy database instance - configuration may not exist during build time
let _db: ReturnType<typeof init> | null = null;

function getDb(): ReturnType<typeof init> {
  if (_db) return _db;

  const appId = process.env.INSTANTDB_APP_ID;
  const adminToken = process.env.INSTANTDB_ADMIN_TOKEN;

  if (!appId || !adminToken) {
    // If the variables are missing, we do not want to crash the build.
    // When running in development without InstantDB configured we can
    // return a stub implementation. In production the routes that
    // actually use the database should handle the absence of a real
    // connection.
    if (process.env.NODE_ENV === 'development') {
      console.warn('InstantDB not configured; using stub implementation');
      _db = {
        query: async () => ({ whitelists: [] }),
        transact: async () => {},
        tx: { whitelists: {} as any },
      } as any;
      return _db!;
    }
    throw new Error('Missing InstantDB configuration');
  }

  _db = init({ appId, adminToken });
  return _db;
}

// Since the actual InstantDB types are complicated and we only
// ever call a small subset of methods, mark the export as `any` to
// keep the type checker happy during build.
export const db: any = {
  query: async (...args: any[]) => (getDb().query as any)(...args),
  transact: async (...args: any[]) => (getDb().transact as any)(...args),
  tx: () => getDb().tx,
};

// Schema for user whitelist
export const usersSchema = {
  whitelists: {
    email: 'string',
    role: 'string',
    name: 'string',
    createdAt: 'number',
  },
};

// Function to check if user is whitelisted
export async function isUserWhitelisted(email: string): Promise<{ allowed: boolean; role?: string }> {
  try {
    const data = await db.query({
      whitelists: {
        $: {
          where: { email },
        },
      },
    });

    if (data.whitelists && data.whitelists.length > 0) {
      return { allowed: true, role: data.whitelists[0].role };
    }

    return { allowed: false };
  } catch (error) {
    console.error('Error checking whitelist:', error);
    return { allowed: false };
  }
}

// Function to add user to whitelist (for admin use)
export async function addToWhitelist(email: string, name: string, role: string = 'user'): Promise<boolean> {
  try {
    const newId = id();
    await db.transact([
      db.tx().whitelists[newId].update({
        email,
        name,
        role,
        createdAt: Date.now(),
      }),
    ]);
    return true;
  } catch (error) {
    console.error('Error adding to whitelist:', error);
    return false;
  }
}
