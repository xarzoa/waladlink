import Info from '@/components/custom/home/info';
import FAQ from '@/components/custom/home/faq';
import Landing from '@/components/custom/home/landing';
import Header from '@/components/custom/home/header';
import ProfileCard from '@/components/custom/home/profile-card';
import WalletsCard from '@/components/custom/home/wallets-card';
import Footer from '@/components/custom/footer';

export const metadata = {
  title: 'WalAd - All your wallet addresses in one place.',
  description:
    'WalAd is a service that let you put all your wallet addresses in one place and share a link. They tryna simplify the process of sharing long, messy wallet addresses.',
  url: 'https://www.walad.link',
};

export default function HomePage() {
  return (
    <main className="mt-14">
      <div className="text-alice-blue">
        <div>
          <Header display={true} />
          <Landing />
        </div>
        <div className="flex flex-wrap items-center justify-center shadow-red-lg mb-8 gap-4">
          <ProfileCard background="black" />
          <WalletsCard background="black" />
        </div>
        <Info />
        <FAQ />
        <Footer />
      </div>
    </main>
  );
}
