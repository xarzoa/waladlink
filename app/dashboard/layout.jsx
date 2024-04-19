import Header from "@/components/custom/dashboard/header";
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }) {
  const session = await auth()
  if(session.user.isnew){
    redirect('/onboarding')
  }
  return (
    <div>
      <Header session={session}/>
      <div className="p-4 mt-14">
        {children}
      </div>
    </div>
  );
}
