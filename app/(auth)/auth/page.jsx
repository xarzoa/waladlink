import Authentication from '@/components/custom/auth/email';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'WalAd - Authentication.',
  description: 'Sign in or sign up to WalAd with DuckPass.',
  url: 'https://www.ducklabs.xyz',
};

export const dynamic = 'force-dynamic';

export default async function Auth() {
  try {
    const session = await auth();
    if (session) {
      redirect('/dashboard');
    }
  } catch (e) {
    console.log(e);
  }
  return (
    <main className="min-h-screen w-screen grid place-items-center">
      <Authentication />
    </main>
  );
}
