import Image from 'next/image';

export default function Previews() {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 md:place-items-start">
        <div className="place-self-center lg:place-self-end relative duration-500 size-72 md:size-96 lg:size-auto my-16">
          <div className="size-40 md:size-64 duration-500 -left-3 md:-left-20 absolute z-20">
            <div className="animate-preview delay-500">
              <Image
                src="/assets/wallets.png"
                alt="preview"
                height={300}
                width={200}
                priority={false}
                className="blur-sm hover:blur-none duration-500 hover:scale-105 w-auto h-auto"
              />
            </div>
          </div>
          <div className="animate-preview hover:z-30">
            <Image
              src="/assets/preview.png"
              alt="wallets"
              width={300}
              height={400}
              className="duration-500 hover:scale-105 w-auto h-auto"
              priority={false}
            />
          </div>
          <div className="absolute animate-preview delay-300 -top-0 left-40">
            <div className="absolute h-20 w-16 md:h-44 md:w-44 bg-white blur-3xl rounded-full duration-500"></div>
          </div>
        </div>
        <div className="p-4 place-self-center lg:place-self-start space-y-4 m-4 lg:m-12 max-w-lg">
          <h1 className="text-3xl md:text-4xl font-bold font-gabarito text-neutral-200">
            What and how?
          </h1>
          <div className="font-semibold text-neutral-400 space-y-4">
            <p>
              <span className="underline">WalAd</span> simplifies things! Create
              a single, secure link that holds all your crypto wallet addresses.
              Anyone can then send you crypto directly, without needing multiple
              addresses.
            </p>
            <h3 className="text-lg md:text-xl font-bold text-neutral-300">
              Here&apos;s the best part:
            </h3>
            <ul className="list-disc ml-4">
              <li>
                No need to connect your wallets - WalAd keeps your private keys
                safe.
              </li>
              <li>Get started in under a minute:</li>
              <ul className="list-decimal ml-5 text-neutral-500">
                <li>Sign up with a secure email (Proton Mail recommended).</li>
                <li>Create a username and customize your profile.</li>
                <li>Add your wallet addresses.</li>
                <li>Share your unique WalAd link!</li>
              </ul>
            </ul>
            <p>
              WalAd makes sending and receiving crypto effortless. Sleep soundly
              knowing your funds are secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
