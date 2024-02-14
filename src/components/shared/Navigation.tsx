'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { NavLink, useParams, useResolvedPath } from 'react-router-dom';

export default function Navigation({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> & { className?: string }) {
  const activeClass =
    'flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary bg-muted font-medium text-primary';

  const linkClasses = ({ isActive }: { isActive: boolean }) => {
    console.log(isActive);
    return cn('text-sm font-medium transition-colors hover:text-primary', isActive ? activeClass : '');
  };

  const { organization, repository } = useParams();

  useResolvedPath('projects');

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
      <NavLink to={`/${organization}/${repository}`} className={linkClasses}>
        Overview
      </NavLink>
      <NavLink to={`./${organization}/${repository}/tags`} className={linkClasses}>
        Tags
      </NavLink>
    </nav>
  );
}
