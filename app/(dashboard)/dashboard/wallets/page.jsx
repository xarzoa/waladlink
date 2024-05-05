import WalletsComp from '@/components/custom/dashboard/wallets';
import { getUser } from '@/lib/getUser';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'WalAd - Dashboard/Wallets',
  description: 'WalAd Dashboard/Images',
  url: 'https://www.walad.link/dashboard/wallets',
};

export default async function Wallets() {
  const session = await auth()
  const user = await getUser(session.user.id, 'private')
  return (
    <main>
      <WalletsComp user={user}/>
    </main>
  );
}
