'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { Button } from '@/app/ui/button';

export default function WelcomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const userRole = (session.user as any).role || 'user';

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className={`${lusitana.className} text-4xl font-bold mb-4`}>
            Welcome!
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            You have successfully signed in with Google
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-center mb-6">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || 'User'}
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                {session.user.name?.charAt(0) || 'U'}
              </div>
            )}
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">
              {session.user.name}
            </h2>
            <p className="text-gray-600">{session.user.email}</p>
            <div className="mt-4 inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Role: {userRole}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <Button
            onClick={() => router.push('/dashboard')}
            className="w-full"
          >
            Go to Dashboard
          </Button>
          
          <Button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </main>
  );
}
