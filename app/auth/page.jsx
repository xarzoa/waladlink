import Authentication from "@/components/custom/auth/email";
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'WalAd - Authentication.',
  description:
    "Sign in or sign up to WalAd with DuckPass.",
  url: 'https://www.ducklabs.xyz',
};

export default async function Auth() {
  const session = await auth()
  if(session){
    redirect('/dashboard')
  }
  return (
    <main className="min-h-screen w-screen grid place-items-center">
      <Authentication/>
    </main>
  );
}
