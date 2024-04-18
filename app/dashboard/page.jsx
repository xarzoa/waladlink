import DashboardComp from "@/components/custom/dashboard/dashboard";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: 'WalAd - Dashboard',
  description: 'WalAd Dashboard',
  url: 'https://www.walad.link',
};

export default async function Dashboard() {
  const { session } = await getServerSession(authOptions)
  return (
    <main>
      <DashboardComp data={session.user}/>
    </main>
  );
}
