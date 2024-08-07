import GlassTheme from '@/components/custom/themes/glass';
import CloudsTheme from '@/components/custom/themes/clouds';
import CandyTheme from '@/components/custom/themes/candy';
import GraphiteTheme from '@/components/custom/themes/graphite';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getUser } from '@/lib/getUser';

export async function generateMetadata({ params }) {
  const user = await getUser(params.user);
  if (!user) {
    return {
      title: `404 - User not found.`,
    };
  }
  if (user.banned) {
    return {
      title: `${user.name} was banned.`,
    };
  }
  return {
    title: `${user.name}'s wal-adds.`,
    description: user.bio,
    icons: {
      icon: {
        url: `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/optimize/web/avatars/${user.avatar || 'OWI3QuJB2pqaeYcF5VSczkB6.png' }?bucket=walad&width=128&height=128`
      },
    },
  };
}

export default async function UserPage({ params }) {
  const user = await getUser(params.user);
  if (!user) {
    return (
      <div>
        <div className="grid place-items-center min-h-screen">
          <div className="space-y-2">
            <div className="text-center font-bold text-6xl font-dmsans">
              404
            </div>
            <Separator />
            <div className="px-4 text-neutral-300 font-jbmono">
              User doesn&apos;t exsist.
            </div>
            <div className="grid place-items-center">
              <Button className="mt-4 pb-2" asChild>
                <Link href="/auth">Claim this username</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (user.banned) {
    return (
      <div>
        <div className="grid place-items-center min-h-screen">
          <div className="space-y-2">
            <div className="text-center font-bold text-6xl font-dmsans">
              Dang.
            </div>
            <Separator />
            <div className="px-4 text-neutral-300 font-jbmono text-center">
              This user was banned.
            </div>
            <div>
              <Separator />
              <div className="text-sm font-jbmono text-neutral-400 grid grid-cols-1">
                <div className="flex">
                  <pre className="text-neutral-300 font-semibold mr-2">
                    Reason:
                  </pre>{' '}
                  <pre>{user.banCase}</pre>
                </div>
                <div className="flex">
                  <pre className="text-neutral-300 font-semibold mr-2">
                    BanId:
                  </pre>{' '}
                  <pre>{user.banId}</pre>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1">
              <Button className="mt-4 pb-2" asChild>
                <a href="https://support.ducklabs.xyz">File an appeal</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const themes = {
    candy: <CandyTheme user={user} />,
    clouds: <CloudsTheme user={user} />,
    graphite: <GraphiteTheme user={user} />,
    glass: <GlassTheme user={user} />,
    undefined: <GraphiteTheme user={user} />,
  };
  return themes[user.theme];
}
