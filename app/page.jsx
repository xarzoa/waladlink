import WhiteTheme from '@/components/custom/home/white-theme';
import BlackTheme from '@/components/custom/home/black-theme';
import Features from '@/components/custom/home/features';
import Landing from '@/components/custom/home/landing';
import Pricing from '@/components/custom/home/pricing';
import Header from '@/components/custom/home/header';
import Info from '@/components/custom/home/info';
import Footer from '@/components/custom/footer';
import FAQ from '@/components/custom/home/faq';

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
        <div>
          <Features />
        </div>
        <div className="flex flex-wrap items-center justify-center shadow-red-lg mb-8 gap-4">
          <BlackTheme />
          <WhiteTheme />
        </div>
        <div>
          <Pricing />
        </div>
        <Info />
        <FAQ />
        <Footer />
      </div>
    </main>
  );
}
