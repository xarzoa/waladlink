'use client';
import { Navigation, BadgeCheck, Copy, Check } from 'lucide-react';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import Link from 'next/link';

export default function CandyTheme({ user }) {
  const [tab, setTab] = useState('info');
  return (
    <main>
      <div className="bg-[#CDB4DB]">
        <div className="grid grid-cols-1 place-items-center min-h-screen">
          <div className="p-4 sm:rounded-3xl sm:h-[30rem] sm:w-[20rem] h-full w-full grid grid-cols-1 shadow-2xl backdrop-blur-2xl bg-[#FFC8DD] text-[#223127] border border-[#FFAFCC] duration-500">
            <Tabs user={user} tab={tab} />
            <div className="flex  absolute bottom-0 w-full rounded-3xl justify-evenly duration-500 font-dmsans">
              <button
                onClick={() => setTab('info')}
                className={`${
                  tab === 'info' ? 'bg-[#FFAFCC]/50 border-[#FFAFCC]' : ''
                } w-full h-full p-2 sm:rounded-bl-3xl duration-500 border border-transparent`}
              >
                Info
              </button>
              <button
                onClick={() => setTab('wallets')}
                className={`${
                  tab === 'wallets' ? 'bg-[#FFAFCC]/50 border-[#FFAFCC]' : ''
                } w-full h-full p-2 sm:rounded-br-3xl duration-500 border border-transparent`}
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
        <Avatar className="h-32 w-32 rounded-3xl shadow-sm">
          <AvatarImage
            src={user.avatar ? `${user.avatar}&width=128&height=128` : ''}
            alt={`${user.name}'s profile picture.`}
          />
          <AvatarFallback className="text-5xl bg-[#BDE0FE]/40">
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
              <HoverCardContent className="bg-[#FFAFCC]/70 border-[#FFAFCC] backdrop-blur-lg rounded-3xl text-sm">
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
        <div className="shadow-inner py-2 px-4 rounded-3xl text-sm font-light font-mono text-center bg-[#BDE0FE]/40">
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
      <div className="flex align-middle items-center border  border-[#FFAFCC] rounded-3xl relative">
        <div className="absolute -top-2 bg-[#BDE0FE]/40 backdrop-blur-xl text-xs px-2 pb-[1px] rounded-[10px] font-semibold font-dmsans">
          {wallet.name}
        </div>
        <div className="bg-[#BDE0FE]/40 p-2 pl-3 rounded-l-3xl w-full hover:bg-[#BDE0FE]/20 font-jbmono duration-500 select-none truncate">
          {wallet.address}
        </div>
        <div>
          <Button
            size="icon"
            onClick={() => copyToClipboard(wallet.address)}
            className="rounded-r-3xl bg-[#A2D2FF]/60 hover:bg-[#A2D2FF]/50 focus:bg-[#A2D2FF]/50"
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
