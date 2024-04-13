import Authentication from "@/components/custom/auth/email";

export const metadata = {
  title: 'WalAd - Authentication.',
  description:
    "Sign in or sign up to WalAd with DuckPass.",
  url: 'https://www.ducklabs.xyz',
};

export default function Auth() {
  return (
    <main className="min-h-screen w-screen grid place-items-center">
      <Authentication/>
    </main>
  );
}
