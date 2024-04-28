import WhiteTheme from '@/components/custom/home/white-theme';
import BlackTheme from '@/components/custom/home/black-theme';
import Landing from '@/components/custom/home/landing';
import Pricing from '@/components/custom/home/pricing';
import Header from '@/components/custom/home/header';
import Info from '@/components/custom/home/info';
import Footer from '@/components/custom/footer';
import FAQ from '@/components/custom/home/faq';
import Previews from '@/components/custom/home/previews';

export const metadata = {
  title: 'WalAd: Ditch the Messy Crypto Addresses, Share Simply.',
  description:
    'Consolidate your crypto presence with WalAd! Showcase all your wallet addresses in a single, secure link. Just like Linktree for crypto, WalAd lets you share your wallets without ever compromising private keys. Simplify crypto connections. Start using WalAd today!',
  url: 'https://www.walad.link',
};

export default function HomePage() {
  const user = {
    avatar:
      'https://images.ducklabs.xyz/optimize/waladlinkweb/assets/5665d5ff-93f5-49ed-9a80-ea11b3a30e18.png?bucket=ducklabs&width=200&height=200%3Dquality%3D10',
    name: 'Cloudy Blobs',
    verified: true,
    location: 'Moon',
    bio: `Challenging the concept of "form" since the dawn of time. One ooze at a time. 🫠`,
    wallets: [
      {
        address: '0x784B2faE5B399dB1343A98dBcA7827eff4B0b411',
        name: 'DogeBonk',
      },
      { address: '0x89765EEdD4D47b87aBCFcb9deFeC28D', name: 'PizzaCoin' },
      {
        address: '0xCA3C7c5A9E8cD4248Db64A2bF7Ff56c599E47aDf',
        name: 'MoonCat',
      },
      {
        address: '0x1D3B2c843aDf3A94c00cD2C5b3c7b7cAaE8D88bE',
        name: 'LazyCoin',
      },
      {
        address: '0xABc09876DEfGh1jKLmNopqR1234567890',
        name: 'SockPuppetCoin',
      },
      {
        address: '0xDef1234567890AbCdEfGhIjKlMnOpQrStUvWxYz',
        name: 'KarenCoin',
      },
      { address: '0xFfedcba0987654321AbCdEf0123456789', name: 'FOMOCoin' },
      { address: '0x1a2B3C4D5E6F7890AbCdEf1234567890', name: 'ScamCoin' },
      { address: '0x9876543210AbCdEfGhIjKlMnOpQrStUvWxYz', name: 'GlitchCoin' },
      { address: '0xBA9876543210Fedcba0987654321', name: 'CaffeineCoin' },
    ],
  };

  const bragging = [
    'Your data? Safer than the Ark of the Covenant... (We never sell them, pinky swear.)',
    'Login with your email? Revolutionary! No passwords, Piece of cake, Groundbreaking! ',
    "You control who sees your stuff? Woah, such power! (Public by default, but hey, search engines won't find you... like Bigfoot.)",
    "We're fast! Like a greased mongoose on roller skates. (Okay, maybe not *that* fast, but still faster than dial-up.)",
  ];
  return (
    <main className="mt-20 relative">
      <div className="absolute -left-96 -top-96 h-[50vw] w-14 bg-white/50 blur-[80px] rotate-45 -z-20"></div>
      <div className="absolute left-5 h-[50vw] w-14 bg-white/50 blur-[80px] rotate-45 -z-20"></div>
      <div className="fixed right-5 h-[50vw] w-14 bg-white/50 blur-[100px] rotate-45 -z-20 hover:blur-[200px]"></div>
      <div className="absolute bottom-10 h-[50vw] w-14 bg-white/50 blur-[80px] rotate-45 -z-20"></div>
      <div>
        <div>
          <Header display={true} />
          <Landing />
          <Previews />
        </div>
        <div className="grid place-items-center lg:m-12 m-6">
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 font-semibold font-dmsans divide-solid md:divide-none divide-y list-disc md:text-lg text-neutral-400">
            {bragging.map((brag, index) => (
              <li key={index} className="pt-3 max-w-lg m-4">
                {brag}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid mx-6 py-16">
          <div className="grid place-items-center relative">
            <div className="animate-preview delay-700">
              <div className="blur-sm hover:blur-none hover:scale-105 duration-500">
                <WhiteTheme user={user} />
              </div>
            </div>
            <div className="animate-preview absolute">
              <div className="hover:scale-105 duration-500">
                <BlackTheme user={user} />
              </div>
            </div>
          </div>
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
