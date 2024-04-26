'use client';
import { Fingerprint, KeyRound, Beer, Send } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Fingerprint className="w-6 h-6" />,
      info: 'Unique! (Grandma recipe?)',
    },
    {
      icon: <KeyRound className="w-6 h-6" />,
      info: 'Secure: Fort Knox vibes,',
    },
    {
      icon: <Beer className="w-6 h-6" />,
      info: 'Easy: Even I can do it.',
    },
    {
      icon: <Send className="w-6 h-6" />,
      info: 'Fast: Sloth on espresso..',
    },
  ];

  return (
    <div>
      <div className="my-20 mx-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-10">
          {features.map((feature, index) => (
            <div key={index} className="space-y-3 place-self-center">
              <div className="flex items-center">
                <div className="relative text-neutral-300 mr-2">
                  {feature.icon}
                </div>
                <div className="font-bold font-mono text-neutral-300">
                  {feature.info}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
