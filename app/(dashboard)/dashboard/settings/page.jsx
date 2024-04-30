import SettingsComp from '@/components/custom/dashboard/settings';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'WalAd - Dashboard/Settings',
  description: 'WalAd Dashboard/Settings',
  url: 'https://www.walad.link/dashboard/settings',
};

export default async function Settings() {
  const session = await auth();
  return (
    <main>
      <SettingsComp data={session.user} />
    </main>
  );
}
