import { auth } from '@/lib/auth';
import { getUser } from '@/lib/getUser';
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
        <div>
          Hello world
        </div>
      </div>
    </main>
  );
}