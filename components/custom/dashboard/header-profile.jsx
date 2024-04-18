'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Settings, Loader, MessagesSquare } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { signOut } from "next-auth/react"

function ReuseAvatar({ email, image, name }) {
  return (
    <Avatar className="rounded-none">
      {image ? <AvatarImage src={`${image}&width=128&height=128`} /> : ''}
      <AvatarFallback className="rounded-none">
        {name
          ? name.split('')[0].toUpperCase()
          : email.split('')[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}

function SmallProfile({ email, name }) {
  return (
    <div className="text-neutral-400 p-2 grid grid-cols-1 items-baseline text-xs truncate">
      <div className='text-sm font-bold'>{name}</div>
      <div>{email}</div>
    </div>
  );
}

export default function Profile({ path, session }) {
  const [name, setName] = useState(session.user.name);
  const [image, setImage] = useState(session.user.image);
  const [email, setEmail] = useState(session.user.email);
  const [isLoading, setIsLoading] = useState(false);
  const doSignOut = async () => {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
  };

  return (
    <div className="grid place-items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="bg-neutral-800 hover:bg-neutral-800 text-neutral-200 rounded-none"
          >
            <ReuseAvatar email={email} image={image} name={name} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2 mt-1 lg:mr-4">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <SmallProfile email={email} image={image} name={name} />
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className={path === "/dashboard/settings" ? 'bg-neutral-600/40' : ''}>
            <Link href="/dashboard/settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="https://support.ducklabs.xyz" className="flex items-center">
              <MessagesSquare className="mr-2 h-4 w-4" />
              Support
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={doSignOut}>
            {isLoading ? (
              <Loader className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <LogOut className="mr-2 h-4 w-4" />
            )}
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}