'use client';
import { Navigation, BadgeCheck, Copy, Check } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import Link from 'next/link';
import { useState } from 'react';

export default function GraphiteTheme({ user }) {
  const [tab, setTab] = useState('info');
  return (
    <div
      className={`relative p-4 rounded-3xl h-[24rem] w-[16rem] grid grid-cols-1 shadow-2xl backdrop-blur-2xl bg-black text-white border border-neutral-900 shadow-white/20 rotate-6 md:rotate-12`}
    >
      <Tabs user={user} tab={tab} />
      <div className="flex gap-2 absolute bottom-0 w-full rounded-3xl justify-evenly duration-500 font-dmsans bg-black/60 backdrop-blur-lg">
        <button
          onClick={() => setTab('info')}
          className={`${
            tab === 'info' ? 'bg-white/5 border-neutral-900' : ''
          } w-full h-full p-2 rounded-3xl duration-500 border border-transparent`}
        >
          Info
        </button>
        <button
          onClick={() => setTab('wallets')}
          className={`${
            tab === 'wallets' ? 'bg-white/5 border-neutral-900' : ''
          } w-full h-full p-2 rounded-3xl duration-500 border border-transparent`}
        >
          Wallets
        </button>
      </div>
    </div>
  );
}

function Info({ user }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 place-items-center">
        <Avatar className="h-24 w-24 rounded-3xl">
          <AvatarImage
            src={user.avatar ? `${user.avatar}&width=128&height=128` : ''}
            alt={`${user.name}'s profile picture.`}
          />
          <AvatarFallback className="text-5xl bg-neutral-900">
            {user.name.split('')[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="mt-2 font-bold flex align-middle items-center">
          {user.name}
          {user.verified ? (
            <HoverCard>
              <HoverCardTrigger>
                <BadgeCheck className="ml-2 pt-[3px] h-5 w-5" />
              </HoverCardTrigger>
              <HoverCardContent className="bg-black/50 backdrop-blur-lg rounded-3xl text-sm">
                <div className="text-center">Verified user.</div>
                <div className="font-normal text-center">
                  You can get verified by requesting or purchasing one of our
                  paid plans.
                </div>
                <div className="grid w-full grid-cols-1 mt-3">
                  <Button className="rounded-3xl" asChild>
                    <Link href="/pricing">Get verified.</Link>
                  </Button>
                </div>
              </HoverCardContent>
            </HoverCard>
          ) : (
            ''
          )}
        </div>
      </div>
      {user.location ? (
        <div className="flex items-center align-middle justify-center">
          <Navigation className="h-4 w-4" />
          <p className="pl-2 text-xs">{user.location}</p>
        </div>
      ) : (
        ''
      )}
      {user.bio ? (
        <div className="shadow-inner py-2 px-4 rounded-3xl text-sm font-light font-mono text-center bg-white/5">
          <p className="text-wrap truncate">{user.bio}</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

function Wallets({ wallets }) {
  return (
    <div className="w-full space-y-3 overflow-auto max-h-[20rem] hide-scroll pt-2">
      {wallets.map((wallet, index) => (
        <div key={index}>
          <CopyWallet wallet={wallet} />
        </div>
      ))}
    </div>
  );
}

function CopyWallet({ wallet }) {
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const hasCopiedText = Boolean(copiedText);
  return (
    <div>
      <div className="flex align-middle items-center border border-neutral-900 rounded-3xl relative text-sm">
        <div className="absolute -top-2 bg-white/5 backdrop-blur-xl text-xs px-2 pb-[1px] rounded-[10px] font-semibold font-dmsans">
          {wallet.name}
        </div>
        <div className="bg-white/5 p-2 pl-3 rounded-l-3xl w-full hover:bg-white/10 duration-500 select-none truncate font-jbmono">
          {wallet.address}
        </div>
        <div>
          <Button
            size="icon"
            onClick={() => copyToClipboard(wallet.address)}
            className="rounded-r-3xl"
          >
            {hasCopiedText ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
function Tabs({ user, tab }) {
  if (tab === 'info') {
    return <Info user={user} />;
  }
  if (tab === 'wallets') {
    return <Wallets wallets={user.wallets} />;
  }
}

// export default function ProfileCard({ background }) {
//   const image =

//   return (
//     <main>
//       <motion.div
//         className="flex justify-center m-4 mb-6 cursor-move min-h-[30rem] w-[20rem]"
// whileHover={{ scale: 1.1, rotate: 3 }}
// transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
//       >
//         <Image
//           alt="Mountains"
//           src={image}
//           blurDataURL={image}
//           placeholder="blur"
//           quality={100}
//           width="320"
//           height="480"
//           className="relative"
//           style={{
//             objectFit: 'cover',
//           }}
//         />
//         <div
//           className={`bg-${background} bg-transparent p-4 border border-transparent min-h-[30rem] w-[20rem] grid grid-cols-1 place-items-center shadow-2xl backdrop-blur-2xl absolute`}
//         >
//           <div className="grid grid-cols-1 place-items-center">
//             <Image
//               src={image}
//               alt="somethign"
//               width="100"
//               height="100"
//               className="rounded-none shadow-lg h-auto w-auto"
//             />
//             <div className="mt-2 font-bold flex align-middle items-center">
//               Cloudy Blobs
//               <BadgeCheck className="ml-2 pt-[3px] h-5 w-5" />
//             </div>
//           </div>
//           <div className="flex items-center align-middle">
//             <Navigation className="h-4 w-4" />{' '}
//             <p className="pl-2 text-xs">United Kingdom</p>
//           </div>
//           <div className="shadow-inner py-2 px-4 rounded-none text-sm font-light font-mono text-center bg-black/10 hover:bg-black/30 duration-500">
//             <p>
//               Image quality: Potato. But hey, at least it&apos;s not a loading
//               screen... yet.
//             </p>
//           </div>
//           <div className="w-full">
//             <button className="w-full p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] font-bold duration-500 bg-black bg-opacity-30 hover:shadow-none hover:bg-transparent">
//               Socials
//             </button>
//           </div>
//           <div className="w-full">
//             <button className="w-full p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] font-bold duration-500  bg-black bg-opacity-40 hover:shadow-none hover:bg-transparent">
//               Wallets
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     </main>
//   );
// }
