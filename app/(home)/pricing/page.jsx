import PricingComp from '@/components/custom/home/pricing';

export const metadata = {
  title: 'WalAd - Pricing',
  description: 'Our afforable pricing.',
  url: 'https://www.walad.link/pricing',
};

export default function Pricing() {
  return (
    <main className="mt-[73px] relative">
      <div className="absolute -left-96 -top-96 h-[50vw] w-14 bg-white/50 blur-[80px] rotate-45 -z-20"></div>
      <div className="absolute left-5 h-[50vw] w-14 bg-white/50 blur-[80px] rotate-45 -z-20"></div>
      <div className="fixed right-5 h-[50vw] w-14 bg-white/50 blur-[100px] rotate-45 -z-20 hover:blur-[200px]"></div>
      <div className="absolute bottom-10 h-[50vw] w-14 bg-white/50 blur-[80px] rotate-45 -z-20"></div>
      <div>
        <PricingComp />
      </div>
    </main>
  );
}
