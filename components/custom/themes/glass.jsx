'use client';
import Image from 'next/image';
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
import Link from 'next/link';
import WalAdIcon from '../icons/walad';

export default function GlassTheme({ user }) {
  const [tab, setTab] = useState('info');
  return (
    <main>
      <div>
        <div className="fixed h-screen w-screen">
          <Image
            alt={user.name + "'s background."}
            src={
              user.avatar ||
              'https://images.ducklabs.xyz/optimize/waladlinkweb/assets/b8fe5f87-1aed-4db3-ac0a-8d8389bc4062.jpg?bucket=ducklabs&width=1080&height=1080'
            }
            blurDataURL={
              user.avatar ||
              'https://images.ducklabs.xyz/optimize/waladlinkweb/assets/b8fe5f87-1aed-4db3-ac0a-8d8389bc4062.jpg?bucket=ducklabs&width=100&height=100'
            }
            placeholder="blur"
            quality={100}
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <div className="grid grid-cols-1 place-items-center min-h-screen relative">
          <Button
            className="absolute z-50 top-2 right-2 shadow-xl size-7 sm:size-10 duration-500 rounded-3xl"
            size="icon"
            asChild
          >
            <a
              href="https://walad.link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WalAdIcon />
            </a>
          </Button>
          <div className="p-4 sm:rounded-3xl sm:h-[30rem] sm:w-[20rem] h-full w-full grid grid-cols-1 shadow-2xl backdrop-blur-2xl bg-black/20 duration-500">
            <Tabs user={user} tab={tab} />
            <div className="flex absolute bottom-0 w-full rounded-3xl justify-evenly duration-500 font-dmsans">
              <button
                onClick={() => setTab('info')}
                className={`${
                  tab === 'info' ? 'bg-black/10 sm:bg-black/5' : ''
                } w-full h-full p-2 sm:rounded-bl-3xl duration-500`}
              >
                Info
              </button>
              <button
                onClick={() => setTab('wallets')}
                className={`${
                  tab === 'wallets' ? 'bg-black/10 sm:bg-black/5' : ''
                } w-full h-full p-2 sm:rounded-br-3xl duration-500`}
              >
                Wallets
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
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
              <HoverCardContent className="rounded-3xl text-sm border-transparent bg-black/70 backdrop-blur-2xl">
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
    <div className="w-full space-y-3 overflow-auto sm:max-h-[26rem] max-h-[87vh] hide-scroll pt-2">
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
      <div className="flex align-middle items-center relative">
        <div className="absolute -top-2 bg-black/5 backdrop-blur-xl text-xs px-2 pb-[1px] rounded-[10px] font-semibold font-dmsans">
          {wallet.name}
        </div>
        <div className="bg-black/5 p-2 pl-3 rounded-l-3xl w-full hover:bg-black/10 duration-500 select-none truncate font-jbmono">
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
