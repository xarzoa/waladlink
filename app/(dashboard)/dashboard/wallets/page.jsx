import WalletComp from '@/components/custom/dashboard/wallet';

export const metadata = {
  title: 'WalAd - Dashboard/Wallets',
  description: 'WalAd Dashboard/Images',
  url: 'https://www.walad.link/dashboard/wallets',
};

export default async function Wallets() {
  return (
    <main>
      <WalletComp />
    </main>
  );
}
