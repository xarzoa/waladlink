'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function WalletsCard({ background }) {
  const image =
    'https://images.ducklabs.xyz/optimize/waladlinkweb/assets/5665d5ff-93f5-49ed-9a80-ea11b3a30e18.png?bucket=ducklabs&width=200&height=200%3Dquality%3D10';
  return (
    <main>
      <motion.div
        className="flex justify-center m-4 mb-6 cursor-move min-h-[30rem] w-[20rem]"
        whileHover={{ scale: 1.1, rotate: -3 }}
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
          <div className="w-full">
            <button className="w-full p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] font-bold duration-500  bg-black bg-opacity-40 hover:shadow-none hover:bg-transparent">
              Wallets
            </button>
          </div>
          <div className="w-full">
            <button className="w-full p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] font-bold duration-500  bg-black bg-opacity-40 hover:shadow-none hover:bg-transparent">
              Wallets
            </button>
          </div>
          <div className="w-full">
            <button className="w-full p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] font-bold duration-500  bg-black bg-opacity-40 hover:shadow-none hover:bg-transparent">
              Wallets
            </button>
          </div>
          <div className="w-full">
            <button className="w-full p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] font-bold duration-500  bg-black bg-opacity-40 hover:shadow-none hover:bg-transparent">
              Wallets
            </button>
          </div>
          <div className="w-full">
            <button className="w-full p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] font-bold duration-500  bg-black bg-opacity-40 hover:shadow-none hover:bg-transparent">
              Wallets
            </button>
          </div>
          <div className="w-full">
            <button className="w-full p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] font-bold duration-500  bg-black bg-opacity-40 hover:shadow-none hover:bg-transparent">
              Wallets
            </button>
          </div>
          <div className="w-full">
            <button className="w-full p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] font-bold duration-500  bg-black bg-opacity-40 hover:shadow-none hover:bg-transparent">
              Wallets
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
