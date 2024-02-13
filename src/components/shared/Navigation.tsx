'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function Navigation({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
      <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
        Overview
      </Link>
    </nav>
  );
}
