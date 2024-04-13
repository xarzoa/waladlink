import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'WalAd - Dashboard',
  description: 'WalAd Dashboard',
  url: 'https://www.walad.link',
};

export default function Dashboard() {
  return (
    <main>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 duration-700">
        <div className="space-y-2">
          <div className="space-y-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  Welcome <span className="text-neutral-400">{'xar'}</span> !
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
          <Card>
            <CardHeader>
              <CardTitle>Image storage.</CardTitle>
              <CardDescription>Storage usage.</CardDescription>
              <div className="py-4">
                <Progress value={(100 / 500) * 100} />
                <div className="flex justify-between text-xs text-neutral-400 mt-2">
                  <div>0MB</div>
                  <div>{`100/500MB`}</div>
                </div>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Adresses</CardTitle>
              <div className="py-4">
                <Progress value={(20 / 100) * 100} />
                <div className="flex justify-between text-xs text-neutral-400 mt-2">
                  <div></div>
                  <div>{`2/10`}</div>
                </div>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Image storage.</CardTitle>
              <CardDescription>Storage usage.</CardDescription>
              <div className="py-4">
                <Progress value={(100 / 500) * 100} />
                <div className="flex justify-between text-xs text-neutral-400 mt-2">
                  <div>0MB</div>
                  <div>{`100/500MB`}</div>
                </div>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Music.</CardTitle>
              <CardDescription>
                Your music distribution details.
              </CardDescription>
              <div className="flex flex-wrap gap-2">
                <div className="font-bold bg-green-300 bg-opacity-10 rounded-none p-2">
                  <div className="text-xs">Total Tracks</div>
                  <div className="text-2xl">24</div>
                </div>
                <div className="font-bold bg-green-300 bg-opacity-10 rounded-none p-2">
                  <div className="text-xs">Total Albums</div>
                  <div className="text-2xl">7</div>
                </div>
                <div className="font-bold bg-yellow-200 bg-opacity-10 rounded-none p-2">
                  <div className="text-xs">In review</div>
                  <div className="text-2xl">2</div>
                </div>
                <div className="font-bold bg-red-300 bg-opacity-10 rounded-none p-2">
                  <div className="text-xs">Attention required</div>
                  <div className="text-2xl">1</div>
                </div>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Subscription.</CardTitle>
              <CardDescription>Your subscription.</CardDescription>
              <CardDescription>
                <span className="text-neutral-300">Email</span>:{' '}
                {'xar@ducklabs.xyz'}
              </CardDescription>
              <div className="flex flex-wrap gap-2">
                <div className="font-bold bg-green-300 bg-opacity-10 rounded-none p-2 w-full">
                  <div className="text-2xl">Free</div>
                </div>
              </div>
              <Button>Upgrade</Button>
            </CardHeader>
          </Card>
        </div>
        <div className="space-y-2">
          <div className="text-xl lg:text-3xl font-bold text-neutral-400">
            Notifications
          </div>
          <Card>
            <CardHeader>
              <CardTitle>
                Welcome <span className="text-neutral-400">{'xar'}</span>
              </CardTitle>
              <CardDescription>
                Let&apos;s have a look at your dashboard.
              </CardDescription>
              <CardDescription>
                Let&apos;s have a look at your dashboard.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </main>
  );
}
