'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { NavLink, useParams, useResolvedPath } from 'react-router-dom';

export default function Navigation({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> & { className?: string }) {
  const activeClass = 'bg-muted';

  const linkClasses = ({ isActive }: { isActive?: boolean }) => {
    return cn(
      'text-sm font-medium hover:text-primary transition-colors py-1 rounded-full px-4',
      isActive ? activeClass : ''
    );
  };

  const { organization, repository } = useParams();

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
      <NavLink to={`/${organization}/${repository}`} className={linkClasses} end>
        Overview
      </NavLink>
      <NavLink to={`./${organization}/${repository}/tags`} className={linkClasses}>
        Tags
      </NavLink>
      <a href={`https://github.com/${organization}/${repository}`} className={linkClasses({})}>
        Github
      </a>
    </nav>
  );
}
