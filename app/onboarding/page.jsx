import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth";
import { permanentRedirect } from 'next/navigation'
import Username from "@/components/custom/onboarding/username";

export const metadata = {
  title: 'WalAd - Onboarding',
  description:
    'Choose your username.',
  url: 'https://www.walad.link',
};

export default async function OnBoarding(){
  const auth = await getServerSession(authOptions)
  if(!auth?.user.isnew){
    permanentRedirect('/dashboard')
  }
  return(
    <main>
      <div className="min-h-screen w-screen grid place-items-center">
        <Username id={auth?.user.id}/>
      </div>
    </main>
  )
}