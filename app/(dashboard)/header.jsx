'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import { Menu, Settings, Home, WalletMinimal, User } from 'lucide-react';
import Link from 'next/link';
import Profile from '@/components/custom/header-profile';

export default function Header({ session }) {
  const [offset, setOffset] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const path = usePathname();
  const menuButtons = [
    {
      name: 'Home',
      path: '/dashboard',
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      name: 'Profile',
      path: '/dashboard/profile',
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      name: 'Wallets',
      path: '/dashboard/wallets',
      icon: <WalletMinimal className="mr-2 h-4 w-4" />,
    },
    {
      name: 'Settings',
      path: '/dashboard/settings',
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ];

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
        className={`z-50 w-full md:p-4 flex fixed top-0 duration-500 ${
          isScrolled ? 'p-2' : ''
        }`}
      >
        <div className="backdrop-blur-lg bg-black/20 border w-full p-2">
          <div className="w-full font-semibold flex align-middle items-center justify-between text-white">
            <div className="md:flex space-x-4 hidden">
              {menuButtons.map((button, key) => (
                <Button
                  key={key}
                  className={`font-bold backdrop-blur-2xl rounded-none focus:bg-neutral-700/30 ${
                    button.path === path ? 'bg-neutral-700/30' : ''
                  }`}
                  variant="ghost"
                  asChild
                >
                  <Link href={button.path}>
                    {button.icon}
                    {button.name}
                  </Link>
                </Button>
              ))}
            </div>
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    className="bg-transparent hover:bg-neutral-800 text-neutral-200 rounded-none"
                  >
                    <Menu />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="ml-2 mt-1 lg:ml-4 space-y-1">
                  {menuButtons.map((button, key) => (
                    <DropdownMenuItem
                      key={key}
                      className={`font-bold backdrop-blur-2xl rounded-none focus:bg-neutral-700/30 ${
                        button.path === path ? 'bg-neutral-700/30' : ''
                      }`}
                      variant="ghost"
                      asChild
                    >
                      <Link href={button.path} className="flex items-center">
                        {button.icon}
                        {button.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="absolute right-2 grid place-items-baseline">
              <Profile session={session} path={path} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
