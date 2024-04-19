'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Navigation, BadgeCheck } from 'lucide-react';

export default function ProfileCard({ background }) {
  const image =
    'https://images.ducklabs.xyz/optimize/waladlinkweb/assets/5665d5ff-93f5-49ed-9a80-ea11b3a30e18.png?bucket=ducklabs&width=200&height=200%3Dquality%3D10';
  return (
    <main>
      <motion.div
        className="flex justify-center m-4 mb-6 cursor-move min-h-[30rem] w-[20rem]"
        whileHover={{ scale: 1.1, rotate: 3 }}
        transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
      >
        <Image
          alt="Mountains"
          src={image}
          blurDataURL={image}
          placeholder="blur"
          quality={100}
          width="320"
          height="480"
          className="relative"
          style={{
            objectFit: 'cover',
          }}
        />
        <div
          className={`bg-${background} bg-transparent p-4 border border-transparent min-h-[30rem] w-[20rem] grid grid-cols-1 place-items-center shadow-2xl backdrop-blur-2xl absolute`}
        >
          <div className="grid grid-cols-1 place-items-center">
            <Image
              src={image}
              alt="somethign"
              width="100"
              height="100"
              className="rounded-none shadow-lg h-auto w-auto"
            />
            <div className="mt-2 font-bold flex align-middle items-center">
              Cloudy Blobs
              <BadgeCheck className="ml-2 pt-[3px] h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center align-middle">
            <Navigation className="h-4 w-4" />{' '}
            <p className="pl-2 text-xs">United Kingdom</p>
          </div>
          <div className="shadow-inner py-2 px-4 rounded-none text-sm font-light font-mono text-center bg-black/10 hover:bg-black/30 duration-500">
            <p>
              Image quality: Potato. But hey, at least it&apos;s not a loading
              screen... yet.
            </p>
          </div>
          <div className="w-full">
            <button className="w-full p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] font-bold duration-500 bg-black bg-opacity-30 hover:shadow-none hover:bg-transparent">
              Socials
            </button>
          </div>
          <div className="w-full">
            <button className="w-full p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] font-bold duration-500  bg-black bg-opacity-40 hover:shadow-none hover:bg-transparent">
              Wallets
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
