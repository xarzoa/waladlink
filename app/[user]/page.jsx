import GlassTheme from '@/components/custom/themes/glass';
import CloudsTheme from '@/components/custom/themes/clouds';
import CandyTheme from '@/components/custom/themes/candy';
import GraphiteTheme from '@/components/custom/themes/graphite';

export async function generateMetadata({ params }) {
  const user = params.user;
  const res = await fetch(`${process.env.BASE_URL}/${user}/get`).then((res) =>
    res.json()
  );
  return {
    title: `${res.data?.name}'s WaladLink`,
    icons: {
      icon: {
        url:
          res.data?.avatar ||
          'https://images.ducklabs.xyz/optimize/waladlinkweb/assets/aa48804b-78f9-47e6-9768-a1a9a26dbed0.png?bucket=ducklabs&width=100&height=100',
      },
    },
  };
}

export default async function UserPage({ params }) {
  async function fetchData() {
    const res = await fetch(`${process.env.BASE_URL}/${params.user}/get`);
    const data = await res.json();
    return data.data;
  }
  const user = await fetchData();
  if (!user) {
    return (
      <div>
        <div className="grid place-items-center">
          <div>{JSON.stringify(user)}</div>
        </div>
      </div>
    );
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
  return <GlassTheme user={user} />;
}
