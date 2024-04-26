'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../../ui/button';

export default function Header() {
  const [offset, setOffset] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (offset > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, [offset]);

  return (
    <header className="flex items-center">
      <nav
        className={`z-50 w-full lg:p-4 flex fixed top-0 duration-500 ${
          isScrolled ? 'p-2' : ''
        }`}
      >
        <div className="backdrop-blur-lg bg-black/20 border w-full px-2 pl-4 py-2">
          <div className="w-full font-semibold flex align-middle items-center justify-between text-white">
            <div className="flex space-x-4 align-middle items-center">
              <Link href="/" className="text-xl font-extrabold">
                WalAd
              </Link>
            </div>
            <div>
              <Button asChild className="font-bold text-lg rounded-none">
                <Link href="/auth">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
