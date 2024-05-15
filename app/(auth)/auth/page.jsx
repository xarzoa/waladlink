import Authentication from './email';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'WalAd - Authentication.',
  description: 'Sign in or sign up to WalAd with DuckPass.',
  url: 'https://www.ducklabs.xyz/auth',
};

export const dynamic = 'force-dynamic';

export default async function Auth() {
  return (
    <main className="min-h-screen w-screen grid place-items-center">
      <Authentication />
    </main>
  );
}
