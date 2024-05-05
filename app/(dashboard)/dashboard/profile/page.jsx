import ProfileComp from '@/components/custom/dashboard/profile';
import { getUser } from '@/lib/getUser';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'WalAd - Dashboard/Profile',
  description: 'WalAd Dashboard/Profile',
  url: 'https://www.walad.link/dashboard/profile',
};

export default async function Profile() {
  const session = await auth();
  const user = await getUser(session.user.id, 'private')
  return (
    <main>
      <ProfileComp user={user}/>
    </main>
  );
}
