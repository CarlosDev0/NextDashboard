import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - NextDashboard',
  description: 'Sign in to your account with Google OAuth',
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in with Google or use your email
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
