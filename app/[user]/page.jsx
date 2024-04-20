import GlassTheme from '@/components/custom/themes/glass';
import CloudsTheme from '@/components/custom/themes/clouds';
import CandyTheme from '@/components/custom/themes/candy';
import GraphiteTheme from '@/components/custom/themes/graphite';

async function fetchData(user) {
  const res = await fetch(`${process.env.BASE_URL}/${user}/get`);
  const data = await res.json();
  return data.data;
}

export async function generateMetadata({ params }) {
  const user = await fetchData(params.user);
  if (!user) {
    return {
      title: `404 - User not found.`,
    };
  }
  if (user.banned) {
    return {
      title: `${user.name} is Banned.`,
    };
  }
  return {
    title: `${user.name}'s WaladLink`,
    icons: {
      icon: {
        url:
          user.avatar ||
          'https://images.ducklabs.xyz/optimize/waladlinkweb/assets/aa48804b-78f9-47e6-9768-a1a9a26dbed0.png?bucket=ducklabs&width=100&height=100',
      },
    },
  };
}

export default async function UserPage({ params }) {
  const user = await fetchData(params.user);
  if (!user) {
    return (
      <div>
        <div className="grid place-items-center">
          <div>404 - User not found.</div>
        </div>
      </div>
    );
  }
  if (user.banned) {
    return <div className="grid place-items-center">You&apos;re Banned</div>;
  }
  if (user.theme === 'candy') {
    return <CandyTheme user={user} />;
  }
  if (user.theme === 'clouds') {
    return <CloudsTheme user={user} />;
  }
  if (user.theme === 'graphite') {
    return <GraphiteTheme user={user} />;
  }
  if (user.theme === 'glass'){
    return <GlassTheme user={user} />
  }
}
