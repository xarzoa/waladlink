import SettingsComp from "@/components/custom/dashboard/settings";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: 'WalAd - Dashboard/Settings',
  description:
    "WalAd Dashboard/Settings",
  url: 'https://www.walad.link',
};

export default async function Settings() {
  const { session } = await getServerSession(authOptions)
  return (
    <main>
      <SettingsComp name={session.user.name}/>
    </main>
  );
}
