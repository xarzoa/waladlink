'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function Landing() {
  return (
    <div className="mb-6">
      <div className="p-4 lg:p-8 m-2 grid place-items-center landing-bg bg-clip-content bg-gradient-to-b from-neutral-800">
        <div className="mt-8 gap-0 items-center justify-center text-4xl lg:text-6xl p-4 font-bold text-center">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-600 to-white">
            Use crypto wallets?
          </div>
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-600">
            Wanna share all addresses at once?
          </div>
        </div>
        <div className="text-center mx-4">
          <motion.div
            whileHover={{ scale: 0.99 }}
            transition={{ type: 'spring', bounce: 0.5, duration: 0.1 }}
            className="border cursor-none border-slate-900 shadow-slate-950 hover:shadow-sm duration-500 px-2 py-1 text-sm bg-transparent text-slate-600 shadow-xl bg-gray-900 landing-intro-bg"
          >
            <div>
              Share your long messy wallet addresses,but wait try WalAd instead.
            </div>
          </motion.div>
          <div className='my-6'>
            <motion.div
              className="text-center text-lg font-bold"
              whileHover={{ scale: 0.95 }}
              transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
            >
              <Button className="text-2xl font-bold py-6 rounded-none" asChild>
                <Link href="/dashboard">Get started</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
