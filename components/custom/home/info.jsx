/* eslint-disable react/no-unescaped-entities */
'use client';
import { motion } from 'framer-motion';

export default function Info() {
  return (
    <div className="info-bg rounded-none">
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-start cursor-help text-gray-400 backdrop-blur-xl">
        <motion.div
          whileHover={{ scale: 0.95 }}
          transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
        >
          <div className="text-md p-6">
            <b>WalAd</b> is the best way to share your long annoying wallet
            addresses with ease. With bunch of simple clicks, You can lanch your
            "WalAd page" and impress the whole internet!
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 0.95 }}
          transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
        >
          <div className="text-md p-6">
            We got the most affordable pricing! It's cheaper than cuppa coffee
            for a whole year with premium things, premium support and much more.
            The free tier offers all major features, you got nothing to worry
            about. All you missing is verification, removing our branding and
            few couple of thigs that doesn't affect your overroll experiance.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
