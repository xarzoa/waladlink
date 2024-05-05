'use client';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useUser } from '@/lib/getUser';
import Link from 'next/link';

export default function DashboardComp({ data }) {
  const { user, error, isLoading } = useUser('/dashboard/get');
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
            {isLoading ? (
              <UserPageSkel />
            ) : (
              <UserPage username={user.data.username} />
            )}
          </div>
          <div></div>
        </div>
        <div className="space-y-2">
          <div className="text-xl lg:text-3xl font-bold text-neutral-400">
            Analytics
          </div>
          {isLoading ? <AnalyticsSkel /> : <Analytics user={user} />}
        </div>
        <div className="space-y-2">
          <div className="text-xl lg:text-3xl font-bold text-neutral-400">
            Subscription
          </div>
          {isLoading ? (
            <SubscriptionSkel />
          ) : (
            <Subscription email={data.email} user={user} />
          )}
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
        <CardDescription>
          <div className="flex items-center mt-4">
            <div className="absolute h-3 w-3 bg-white rounded-full blur-[1px]"></div>
            <div className="absolute h-3 w-3 bg-white rounded-full animate-ping blur-[2px]"></div>
            <div className="relative ml-5 font-mono font-bold underline">
              <Link href={'/' + username}>walad.link/{username}</Link>{' '}
            </div>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

function UserPageSkel() {
  return (
    <Card>
      <div className="p-4 space-y-4">
        <Skeleton className="h-8 w-32" />
        <div>
          <Skeleton className="absolute h-5 w-5" />
          <Skeleton className="relative h-5 w-40 mt-3 ml-6" />
        </div>
      </div>
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
              value={
                (user.data.wallets.length / user.data.planInfo.wallets) * 100
              }
            />
            <div className="flex justify-between text-xs text-neutral-400 mt-2">
              <div>0</div>
              <div>{`${user.data.wallets.length}/${user.data.planInfo.wallets}`}</div>
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
function AnalyticsSkel() {
  return (
    <div className="space-y-2">
      <Card>
        <CardHeader>
          <CardTitle>Wallet slots.</CardTitle>
          <CardDescription>Wallet slots you&apos;re using.</CardDescription>
          <div className="py-4">
            <Skeleton className="h-6 w-full" />
            <div className="flex justify-between text-xs text-neutral-400 mt-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-8" />
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Page views.</CardTitle>
          <div className="flex flex-wrap gap-2">
            <div className="font-bold pt-2">
              <Skeleton className="h-7 w-12" />
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
          {user.data.plan === 'FREE' ? (
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
function SubscriptionSkel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription.</CardTitle>
        <CardDescription>Your subscription.</CardDescription>
        <CardDescription>
          <span className="text-neutral-300">Email</span>: easter@e.gg
        </CardDescription>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="w-full h-12" />
        </div>
        <Skeleton className="w-full h-10" />
      </CardHeader>
    </Card>
  );
}
