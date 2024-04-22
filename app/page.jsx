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
  title: 'WalAd: Ditch the Messy Crypto Addresses, Share Simply.',
  description:
    'Consolidate your crypto presence with WalAd! Showcase all your wallet addresses in a single, secure link. Just like Linktree for crypto, WalAd lets you share your wallets without ever compromising private keys. Simplify crypto connections. Start using WalAd today!',
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
        <div className="grid place-items-center">
          <div className='grid grid-cols-1 md:grid-cols-2 gap-14'>
            <BlackTheme />
            <WhiteTheme />
          </div>
        </div>
        <div>
          <Features />
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
