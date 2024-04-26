/* eslint-disable react/no-unescaped-entities */
'use client';
export default function Info() {
  return (
    <div className="info-bg rounded-none relative">
      <div className="h-20 w-full bg-black blur-lg absolute -top-5"></div>
      <div className="h-20 w-full bg-black blur-sm absolute -top-2"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-start cursor-help text-gray-400 backdrop-blur-3xl divide-solid md:divide-none divide-y">
        <div className="text-md p-6">
          Tired of copy-pasting your wallet address like you're playing DDR on
          expert mode? (We feel you.) WalAd is your shortcut to crypto fame.
          Launch your snazzy 'WalAd page' with a few clicks and wow everyone...
          or at least your grandma.
        </div>
        <div className="text-md p-6">
          Free tier's got your back like a trusty sidekick. Premium? Think
          jetpack upgrade! Fancy themes, data deep dives, and bragging rights
          (we won't tell anyone you just want the jetpack). Still unsure? It's
          cheaper than three Big Macs... and way more filling for your crypto
          dreams.
        </div>
      </div>
    </div>
  );
}
