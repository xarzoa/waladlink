import Header from '../header';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }) {
  const session = await auth();
  if (session.user.banned) {
    return (
      <div>
        <div className="grid place-items-center min-h-screen">
          <div className="space-y-2">
            <div className="text-center font-bold text-6xl font-dmsans">
              Dang.
            </div>
            <Separator />
            <div className="px-4 text-neutral-300 font-jbmono text-center">
              You&apos;re banned.
            </div>
            <div>
              <Separator />
              <div className="text-sm font-jbmono text-neutral-400 grid grid-cols-1">
                <div className="flex">
                  <pre className="text-neutral-300 font-semibold">Reason</pre>:{' '}
                  {session.user.banCase}
                </div>
                <div className="flex">
                  <pre className="text-neutral-300 font-semibold">Ban Id</pre>:{' '}
                  {session.user.banId}
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
  if (session.user.isnew) {
    redirect('/onboarding');
  }
  return (
    <div>
      <Header session={session} />
      <div className="p-4 mt-14">{children}</div>
    </div>
  );
}
