'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useUser } from '@/lib/getUser';
import useSWR from 'swr';

export default function DashboardComp({ data }) {
  const { user, error, isLoading } = useUser('/dashboard/get');
  console.log(user);
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
                <div className="font-bold bg-green-300 bg-opacity-10 p-2 w-full">
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
