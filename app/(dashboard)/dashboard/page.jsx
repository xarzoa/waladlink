import { auth } from '@/lib/auth';
import { getUser } from '@/lib/getUser';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'WalAd - Dashboard',
  description: 'WalAd Dashboard',
  url: 'https://www.walad.link/dashboard',
};

export default async function Dashboard() {
  const session = await auth();
  const user = await getUser(session.user.id, 'private');
  const data = session.user
  return (
    <main>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 duration-700 mt-3">
        <div className="space-y-2">
          <div className="space-y-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  Welcome <span className="text-neutral-400">{data.name}</span>{' '}
                  !
                </CardTitle>
                <CardDescription>
                  Let&apos;s see what&apos;s happening.
                </CardDescription>
              </CardHeader>
            </Card>
            <UserPage username={user.username} />
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-xl lg:text-3xl font-bold text-neutral-400">
            Analytics
          </div>
          <Analytics user={user} />
        </div>
        <div className="space-y-2">
          <div className="text-xl lg:text-3xl font-bold text-neutral-400">
            Subscription
          </div>
          <Subscription email={data.email} user={user} />
        </div>
      </div>
    </main>
  );
}

function UserPage({ username }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your page is Live!</CardTitle>
        <div className="text-sm text-neutral-400">
          <div className="flex items-center mt-4">
            <div className="absolute h-3 w-3 bg-white rounded-full blur-[1px]"></div>
            <div className="absolute h-3 w-3 bg-white rounded-full animate-ping blur-[2px]"></div>
            <div className="relative ml-5 font-mono font-bold underline">
              <Link href={'/' + username}>walad.link/{username}</Link>{' '}
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

function Analytics({ user }) {
  return (
    <div className="space-y-2">
      <Card>
        <CardHeader>
          <CardTitle>Wallet slots.</CardTitle>
          <CardDescription>Wallet slots you&apos;re using.</CardDescription>
          <div className="py-4">
            <Progress
              value={(user.wallets.length / user.planInfo.wallets) * 100}
            />
            <div className="flex justify-between text-xs text-neutral-400 mt-2">
              <div>0</div>
              <div>{`${user.wallets.length}/${user.planInfo.wallets}`}</div>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Page views.</CardTitle>
          <div className="flex flex-wrap gap-2">
            <div className="font-bold pt-2">
              Sooon.
              {/* <div className="text-xs">Total Page views.</div>
              <div className="text-2xl"></div> */}
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

function Subscription({ email, user }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription.</CardTitle>
        <CardDescription>Your subscription.</CardDescription>
        <CardDescription>
          <span className="text-neutral-300">Email</span>: {email}
        </CardDescription>
        <>
          {user.plan === 'FREE' ? (
            <>
              <div className="flex flex-wrap gap-2">
                <div className="font-bold bg-neutral-300 bg-opacity-10 p-2 w-full">
                  <div className="text-2xl">Free</div>
                </div>
              </div>
              <Button>Upgrade</Button>
            </>
          ) : (
            <div className="flex flex-wrap gap-2">
              <div className="font-bold bg-yellow-300/10 p-2 w-full">
                <div className="text-2xl">Duckmium</div>
              </div>
            </div>
          )}
        </>
      </CardHeader>
    </Card>
  );
}
