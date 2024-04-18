'use client';
import { Navigation, BadgeCheck, Copy, Check } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function GraphiteTheme({ user }) {
  const [tab, setTab] = useState('info');
  return (
    <main>
      <div className="bg-black">
        <div className="grid grid-cols-1 place-items-center min-h-screen">
          <div className="p-4 rounded-3xl min-h-[30rem] max-h-[30rem] w-[20rem] grid grid-cols-1 shadow-2xl backdrop-blur-2xl bg-black text-white border border-neutral-900 shadow-white/5">
            <Tabs user={user} tab={tab} />
            <div className="flex gap-2 absolute bottom-0 w-full rounded-3xl justify-evenly duration-500 font-dmsans">
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
          <AvatarFallback className="text-5xl bg-neutral-900">
            {user.name
              ? user.name.split('')[0].toUpperCase()
              : user.username?.split('')[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="mt-2 font-bold flex align-middle items-center">
          {user.name}
          {user.verified ? (
            <BadgeCheck className="ml-2 pt-[3px] h-5 w-5" />
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
          <p>{user.bio}</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

function Wallets({ wallets }) {
  return (
    <div className="w-full space-y-2 overflow-auto max-h-[26rem] hide-scroll">
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
      <div className="flex align-middle items-center border border-neutral-900 rounded-3xl">
        <div className="bg-white/5 p-2 pl-3 rounded-l-3xl w-full hover:bg-white/10 duration-500 select-none truncate">
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
