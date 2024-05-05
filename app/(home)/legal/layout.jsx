import Header from '@/components/custom/home/header';
import Footer from '@/components/custom/footer';

export default async function LegalLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="grid md:grid-cols-8 mt-[73px]">
        <div className="col-start-2 col-span-6 border-x md:border-t relative">
          <div className="absolute left-5 h-[50vw] w-14 bg-white/50 blur-[80px] rotate-45 -z-20"></div>
          <div className="fixed right-5 h-[50vw] w-14 bg-white/50 blur-[100px] rotate-45 -z-20"></div>
          <div className="">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
