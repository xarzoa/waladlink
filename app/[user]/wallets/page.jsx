import Link from 'next/link';
import Image from 'next/image';
import PinIcon from '@/components/icons/Pin';

export default function UserWallets() {
  return (
    <main>
      <div className="text-alice-blue">
        <Image
          alt="Mountains"
          src="https://res.cloudinary.com/waladlink/image/upload/v1684694272/fcloud/vtpmzdxp3mjx4l5iift7.png"
          blurDataURL="https://res.cloudinary.com/waladlink/image/upload/v1684694272/fcloud/vtpmzdxp3mjx4l5iift7.png"
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
          }}
        />
        <div className="grid grid-cols-1 place-items-center min-h-screen">
          <div className="bg-transparent p-4 border border-transparent rounded-none min-h-[30rem] w-[20rem] grid grid-cols-1 place-items-center shadow-2xl backdrop-blur-2xl">
            <div className="w-full">
              <button className="w-full rounded-none p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] font-bold duration-500  bg-black bg-opacity-40">
                <Link href="/wallets" className="h-full w-full">
                  Wallets
                </Link>
              </button>
            </div>
            <div className="w-full">
              <button className="w-full rounded-none p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] font-bold duration-500  bg-black bg-opacity-40">
                <Link href="/wallets" className="h-full w-full">
                  Wallets
                </Link>
              </button>
            </div>
            <div className="w-full">
              <button className="w-full rounded-none p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] font-bold duration-500  bg-black bg-opacity-40">
                <Link href="/wallets" className="h-full w-full">
                  Wallets
                </Link>
              </button>
            </div>
            <div className="w-full">
              <button className="w-full rounded-none p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] font-bold duration-500  bg-black bg-opacity-40">
                <Link href="/wallets" className="h-full w-full">
                  Wallets
                </Link>
              </button>
            </div>
            <div className="w-full">
              <button className="w-full rounded-none p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] font-bold duration-500  bg-black bg-opacity-40">
                <Link href="/wallets" className="h-full w-full">
                  Wallets
                </Link>
              </button>
            </div>
            <div className="w-full">
              <button className="w-full rounded-none p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] font-bold duration-500  bg-black bg-opacity-40">
                <Link href="/wallets" className="h-full w-full">
                  Wallets
                </Link>
              </button>
            </div>
            <div className="w-full">
              <button className="w-full rounded-none p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] font-bold duration-500  bg-black bg-opacity-40">
                <Link href="/wallets" className="h-full w-full">
                  Wallets
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
