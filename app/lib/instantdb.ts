import { init, id } from '@instantdb/admin';

// Initialize InstantDB admin
const initInstantDB = () => {
  const appId = process.env.INSTANTDB_APP_ID;
  const adminToken = process.env.INSTANTDB_ADMIN_TOKEN;

  if (!appId || !adminToken) {
    throw new Error('Missing InstantDB configuration');
  }

  return init({ appId, adminToken });
};

export const db = initInstantDB();

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
        where: { email },
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
      db.tx.whitelists[newId].update({
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
