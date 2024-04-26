import { ProfileComp } from '@/components/custom/dashboard/profile';

export const metadata = {
  title: 'WalAd - Dashboard/Profile',
  description: 'WalAd Dashboard/Profile',
  url: 'https://www.walad.link',
};

export default function Profile() {
  return (
    <main>
      <ProfileComp />
    </main>
  );
}
