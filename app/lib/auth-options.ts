import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { isUserWhitelisted } from '@/app/lib/instantdb';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.email) {
        const { allowed } = await isUserWhitelisted(user.email);
        if (!allowed) {
          return false;
        }
        return true;
      }
      return false;
    },
    async jwt({ token, user, account }) {
      if (account && user?.email) {
        const { allowed, role } = await isUserWhitelisted(user.email);
        if (allowed && role) {
          token.role = role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
};
