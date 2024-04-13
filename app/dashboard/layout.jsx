import Header from "@/components/custom/dashboard/header";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth";
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }) {
  const auth = await getServerSession(authOptions)
  if(auth?.user.isnew){
    redirect('/onboarding')
  }
  const dummy = {
    user:{
      name: null,
      email: null,
      image: null
    }
  }
  return (
    <div>
      <Header session={auth ? auth.session : dummy}/>
      <div className="p-4 mt-14">
        {children}
      </div>
    </div>
  );
}
