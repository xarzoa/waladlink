import { Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export default function Pricing() {
  const freePricing = [
    {
      title: 'Custom username.',
      description: 'You can choose custom username for your page.',
    },
    {
      title: 'Basic analytics.',
      description: "You'll have access to basic analytics like pages views.",
    },
    {
      title: 'Fully customizable.',
      description: 'You and customize profile, username and themes.',
    },
    {
      title: 'Upto 10 wallet addresses.',
      description: 'You can add upto 10 wallet addressees.',
    },
    {
      title: 'Keep 100% of your transaction.',
      description:
        "We're not a middleman, We just help you to share your wallet addressees.",
    },
    {
      title: 'Full privacy.',
      description:
        'We never use cookies to track you. We use oss to keep track of analytics.',
    },
    {
      title: 'Become an affiliate',
      description: 'Earn money by inviting you friends.',
    },
  ];
  const premiumPricing = [
    {
      title: 'Custom username.',
      description: 'You can choose custom username for your page.',
    },
    {
      title: 'Shoter usernames.',
      description: 'Shoter usernames with just 3 characters.',
    },
    {
      title: 'Advanced analytics.',
      description:
        'Keep track of everything without, Clicks, Page views, Countries, Wallet clicks, Devices.',
    },
    {
      title: 'Fully customizable.',
      description: 'You and customize profile, username and more themes.',
    },
    {
      title: 'Upto 32 wallet addresses.',
      description: 'You can add upto 32 wallet addressees.',
    },
    {
      title: 'Keep 100% of your transaction.',
      description:
        "We're not a middleman, We just help you to share your wallet addressees.",
    },
    {
      title: 'Full privacy.',
      description:
        'We never use cookies to track you. We use oss to keep track of analytics.',
    },
    {
      title: 'Become an affiliate',
      description: 'Earn money by inviting you friends.',
    },
  ];
  return (
    <div>
      <div className="py-6 grid place-items-center pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className='place-self-center'>
            <div className="absolute w-32 md:w-[20rem] h-10 rounded-lg bg-white blur-[80px]"></div>
            <div className="relative w-72 md:w-[20rem] bg-black p-4 text-neutral-200 border-neutral-900 border space-y-4">
              <div>
                <div className="font-bold text-2xl">FREE</div>
                <div className="text-sm text-neutral-500">
                  Perfect for anyone who wanna try and use it.
                </div>
                <div className="font-mono text-xl text-neutral-400 mt-4">
                  0$/month
                </div>
              </div>
              <Separator />
              <div className="space-y-8">
                {freePricing.map((feature, index) => (
                  <div key={index}>
                    <div className="flex font-semibold font-serif text">
                      <Check
                        className="h-4 w-4 mr-2 text-green-400"
                        strokeWidth={3}
                      />
                      {feature.title}
                    </div>
                    <div className="text-sm font-dmsans text-neutral-300">
                      {feature.description}
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1">
                <Button>Get started</Button>
              </div>
            </div>
          </div>
          <div className='place-self-center'>
            <div className="relative w-72 md:w-[20rem] bg-white p-4 text-neutral-800 border-neutral-900 border space-y-4">
              <div>
                <div className="font-bold text-2xl">PREMIUM</div>
                <div className="text-sm text-neutral-500">
                  Perfect for hardcore crypto enthusiasts.
                </div>
                <div className="font-mono text-xl text-neutral-700 mt-4">
                  24.99$/year
                </div>
              </div>
              <Separator />
              <div className="space-y-8">
                {premiumPricing.map((feature, index) => (
                  <div key={index}>
                    <div className="flex font-semibold font-serif text">
                      <Check
                        className="h-4 w-4 mr-2 text-green-400"
                        strokeWidth={3}
                      />
                      {feature.title}
                    </div>
                    <div className="text-sm font-dmsans text-neutral-600">
                      {feature.description}
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1">
                <Button className="bg-black text-white hover:bg-neutral-800">
                  Soon
                </Button>
              </div>
            </div>
            <div className="absolute w-32 md:w-[20rem] h-10 rounded-lg bg-white blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
