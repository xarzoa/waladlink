import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/custom/user/button';
import { Navigation, BadgeCheck } from 'lucide-react';

export default function GlassTheme({ user }) {
  let component = 'info';
  return (
    <main>
      <div className="text-alice-blue">
        <div className="fixed h-screen w-screen">
          <Image
            alt="Mountains"
            src={user.avatar}
            blurDataURL={user.avatar}
            placeholder="blur"
            quality={100}
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <div className="grid grid-cols-1 place-items-center min-h-screen">
          <div className="p-4 rounded-3xl min-h-[30rem] w-[20rem] grid grid-cols-1 place-items-center shadow-2xl backdrop-blur-2xl bg-black/10 border border-black/20">
            <Tabs user={user}/>
          </div>
        </div>
      </div>
    </main>
  );
}

function Info({ user }) {
  return (
    <div>
      <div className="grid grid-cols-1 place-items-center">
        <Image
          src={user.avatar}
          alt={`${user.name}'s profile picture.`}
          width="100"
          height="100"
          className="rounded-3xl shadow-lg border border-black/20"
        />
        <div className="mt-2 font-bold flex align-middle items-center">
          {user.name}
          <BadgeCheck className="ml-2 pt-[3px] h-5 w-5" />
        </div>
      </div>
      {user.location ? (
        <div className="flex items-center align-middle">
          <Navigation className="h-4 w-4" />
          <p className="pl-2 text-xs">{user.location}</p>
        </div>
      ) : (
        ''
      )}
      {user.bio ? (
        <div className="shadow-inner py-2 px-4 rounded-none text-sm font-light font-mono text-center">
          <p>{user.bio}</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

function Wallets({ wallets }) {}
function Tabs({ user }) {
  let component = 'info';
  if (component === 'info') {
    return <Info user={user} />;
  }
}
