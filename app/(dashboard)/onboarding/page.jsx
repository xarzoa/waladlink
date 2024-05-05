import { auth } from '@/lib/auth';
import { redirect, permanentRedirect } from 'next/navigation';
import Username from '@/components/custom/onboarding/username';

export const metadata = {
  title: 'WalAd - Onboarding',
  description: 'Choose your username.',
  url: 'https://www.walad.link/onboarding',
};

export default async function OnBoarding() {
  const session = await auth();
  if (!session) {
    redirect('/auth');
  }
  if (!session.user.isnew) {
    permanentRedirect('/dashboard');
  }
  return (
    <main>
      <div className="min-h-screen w-screen grid place-items-center">
        <Username />
      </div>
    </main>
  );
}
