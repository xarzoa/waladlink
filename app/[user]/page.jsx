import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/custom/user/button';

export default function UserPage({ params }) {
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
            <div className="grid grid-cols-1 place-items-center">
              <Image
                src="https://res.cloudinary.com/waladlink/image/upload/v1684694272/fcloud/vtpmzdxp3mjx4l5iift7.png"
                alt="somethign"
                width="100"
                height="100"
                className="rounded-none shadow-lg"
              />
              <div className="mt-2 font-bold">A guy with a gun</div>
            </div>
            <div className="flex items-center align-middle">
               <p className="pl-2 text-xs">United Kingdom</p>
            </div>
            <div className="shadow-inner py-2 px-4 rounded-none text-sm font-light font-mono text-center">
              <p>
                We don&apos;t have guns in uk but, i have one. That&apos;s all
                about me. Don&apos;t tell anyone that i got a gun. Okay?? Well,
                Check out my wallets and socials below. 😉👇
              </p>
            </div>
            <div className="w-full">
              <Button className="bg-opacity-30" path={params.user + '/socials'}>
                Social
              </Button>
            </div>
            <div className="w-full">
              <Button className="bg-opacity-40" path={params.user + '/wallets'}>
                Wallets
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
