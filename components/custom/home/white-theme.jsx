'use client';
import { Navigation, BadgeCheck, Copy, Check } from 'lucide-react';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import Link from 'next/link';

export default function CloudsTheme() {
  return (
    <div className="relative p-4 rounded-3xl h-[24rem] w-[16rem] grid grid-cols-1 shadow-2xl backdrop-blur-2xl bg-white text-black border border-neutral-300/60 -rotate-6 md:-rotate-12"></div>
  );
}
