import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Landing() {
  return (
    <div className="pb-5 mb-6 grid-dot-bg">
      <div className="p-4 lg:p-8 m-2 grid place-items-center bg-clip-content">
        <div className="mt-8 grid-cols-8 w-full p-4 font-bold">
          <div className="col-span-2 col-end-6 text-center text-5xl md:text-6xl">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white">
              Tired of b
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 to-white">
                ooo
              </span>
              ring, ju
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 to-white">
                gg
              </span>
              ling and me
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 to-white">
                ss
              </span>
              y,
            </h1>
            <h1 className="backdrop-invert text-neutral-700 border pb-3 bg-clip-content">
              crypto wallet addresses?
            </h1>
          </div>
        </div>
        <div className="text-center mx-4">
          <p className="mt-6 text-lg text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white font-semibold leading-relaxed">
            Get your own <b>WalAdLink</b>. Share all your wallet addresses in
            one secure link.
          </p>
          <div className="my-6">
            <div className="text-center text-lg font-bold">
              <Button className="text-2xl font-bold py-6 rounded-none" asChild>
                <Link href="/auth">Get started</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
