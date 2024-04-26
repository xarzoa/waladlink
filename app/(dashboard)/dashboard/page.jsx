import DashboardComp from '@/components/custom/dashboard/dashboard';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'WalAd - Dashboard',
  description: 'WalAd Dashboard',
  url: 'https://www.walad.link',
};

export default async function Dashboard() {
  const session = await auth();
  return (
    <main>
      <DashboardComp data={session.user} />
    </main>
  );
}
