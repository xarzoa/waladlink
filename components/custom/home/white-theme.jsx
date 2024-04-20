'use client';
import { Navigation, BadgeCheck, Copy, Check } from 'lucide-react';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CloudsTheme() {
  const [tab, setTab] = useState('info');
  const user = {
    avatar:
      'https://images.ducklabs.xyz/optimize/waladlinkweb/assets/5665d5ff-93f5-49ed-9a80-ea11b3a30e18.png?bucket=ducklabs&width=200&height=200%3Dquality%3D10',
    name: 'Cloudy Blobs',
    verified: true,
    location: 'Moon',
    bio: "Image quality: Potato. But hey, at least it's not a loading screen... yet.",
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
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 3 }}
      transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
    >
      <div className="absolute w-[20rem] h-10 rounded-lg bg-white blur-[80px] invisible md:visible"></div>
      <div className="relative p-4 rounded-3xl min-h-[30rem] w-[20rem] grid grid-cols-1 shadow-2xl backdrop-blur-2xl bg-white text-black border border-neutral-300/60">
        <Tabs user={user} tab={tab} />
        <div className="flex gap-2 absolute bottom-0 w-full rounded-3xl justify-evenly duration-500 font-dmsans">
          <button
            onClick={() => setTab('info')}
            className={`${
              tab === 'info' ? 'bg-black/5 border-neutral-300/60' : ''
            } w-full h-full p-2 rounded-3xl duration-500 border border-transparent`}
          >
            Info
          </button>
          <button
            onClick={() => setTab('wallets')}
            className={`${
              tab === 'wallets' ? 'bg-black/5 border-neutral-300/60' : ''
            } w-full h-full p-2 rounded-3xl duration-500 border border-transparent`}
          >
            Wallets
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function Info({ user }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 place-items-center">
        <Avatar className="h-32 w-32 rounded-3xl">
          <AvatarImage
            src={user.avatar ? `${user.avatar}&width=128&height=128` : ''}
            alt={`${user.name}'s profile picture.`}
          />
          <AvatarFallback className="text-5xl bg-black/10">
            {user.name
              ? user.name.split('')[0].toUpperCase()
              : user.username?.split('')[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="mt-2 font-bold flex align-middle items-center">
          {user.name}
          {user.verified ? (
            <HoverCard>
              <HoverCardTrigger>
                <BadgeCheck className="ml-2 pt-[3px] h-5 w-5" />
              </HoverCardTrigger>
              <HoverCardContent className="bg-white/20 backdrop-blur-lg rounded-3xl text-sm border-neutral-300/60 text-black">
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
        <div className="shadow-inner py-2 px-4 rounded-3xl text-sm font-light font-mono text-center bg-black/5">
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
    <div className="w-full space-y-3 overflow-auto max-h-[26rem] hide-scroll pt-2">
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
      <div className="flex align-middle items-center border border-neutral-300/60 rounded-3xl relative">
        <div className="absolute -top-2 bg-black/10 backdrop-blur-xl text-xs px-2 pb-[1px] rounded-[10px] font-semibold font-dmsans">
          {wallet.name}
        </div>
        <div className="bg-black/5 p-2 pl-3 rounded-l-3xl w-full hover:bg-black/10 duration-500 select-none truncate">
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
