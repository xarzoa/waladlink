import Header from '@/components/custom/home/header';
import Footer from '@/components/custom/footer';

export default async function LegalLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="grid md:grid-cols-8 mt-[4rem]">
        <div className="col-start-2 col-span-6 border-x md:border-t">
          <div className="">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
