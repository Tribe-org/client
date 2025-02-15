'use client';

import { ChevronLeft, X } from 'lucide-react';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

interface HeaderProps extends PropsWithChildren {
  back?: string;
  onClose?: () => void;
}

export default function Header({ children, back = '', onClose }: HeaderProps) {
  return (
    <header className="flex items-center justify-between py-2">
      <Link
        href={back}
        className={cn(
          'block p-3',
          !back && 'pointer-events-none invisible select-none'
        )}
      >
        <ChevronLeft width={24} height={24} />
      </Link>
      <span className="text-[18px] leading-[140%] font-semibold">
        {children}
      </span>
      <Link
        href={back}
        className={cn(
          'block p-3',
          !onClose && 'pointer-events-none invisible select-none'
        )}
      >
        <X width={24} height={24} />
      </Link>
    </header>
  );
}
