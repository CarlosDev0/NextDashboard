import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { isUserWhitelisted } from '@/app/lib/instantdb';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Check if user email exists in whitelist
      if (user.email) {
        const { allowed, role } = await isUserWhitelisted(user.email);
        
        if (!allowed) {
          // User is not whitelisted - deny sign in
          return false;
        }
        
        // Store role in session token
        return true;
      }
      return false;
    },
    async jwt({ token, user, account }) {
      // Add role to token on initial sign in
      if (account && user?.email) {
        const { allowed, role } = await isUserWhitelisted(user.email);
        if (allowed && role) {
          token.role = role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Add role to session
      if (session.user && token.role) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // Custom login page
    error: '/login',   // Error page
  },
  session: {
    strategy: 'jwt',
  },
});

const authHandler = handler as any;
export { authHandler as GET, authHandler as POST };
