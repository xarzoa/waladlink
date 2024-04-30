import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Landing() {
  return (
    <div className="pb-5 mb-6 font-gabarito md:border-t grid-bg">
      <div className="p-2 lg:p-8 m-2 grid place-items-center bg-clip-content">
        <div className="mt-8 w-full p-4 font-bold text-center">
            <h3 className='text-lg lg:text-2xl text-neutral-500 duration-500'>
              Stop copy pasting your wallet addresses everytime.
            </h3>
          <div className="text-5xl lg:text-6xl duration-500 text-neutral-100">
            Share all your wallets easily.
          </div>
        </div>
        <div className="text-center">
          <p className="lg:text-lg text-neutral-600 font-[500] max-w-sm lg:max-w-lg duration-500">
            Sharing crypto wallet addresses never been easier. Share all your wallet addresses in
            one secure link, globally.
          </p>
          <div className="my-6">
            <div className="text-center text-lg font-bold">
              <Button className="text-2xl font-bold py-6 border" asChild>
                <Link href="/auth">Get started</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
