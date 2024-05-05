import { ProfileComp } from '@/components/custom/dashboard/profile';

export const metadata = {
  title: 'WalAd - Dashboard/Profile',
  description: 'WalAd Dashboard/Profile',
  url: 'https://www.walad.link/dashboard/profile',
};

export default function Profile() {
  return (
    <main>
      <ProfileComp />
    </main>
  );
}
