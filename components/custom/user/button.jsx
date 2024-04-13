'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Button({ children, className, path, ...props }) {

  const router = useRouter()
  function push(){
    router.push(path)
  }

  return (
    <main>
      <motion.div
        whileHover={{ scale: 0.95 }}
        transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
      >
        <button
          className={`w-full rounded-none p-3 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] font-bold duration-500 bg-black hover:bg-transparent first-letter: ${className}`} onClick={push}
          {...props}
        >
          {children}
        </button>
      </motion.div>
    </main>
  );
}
