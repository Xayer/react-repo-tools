'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';
import { UserContext } from './AuthProvider';
import { UserNav } from './UserNav';
import RepositorySwitch from './RepositorySwitch';

export default function Navigation({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> & { className?: string }) {
  const activeClass = 'bg-muted';

  const userContext = React.useContext(UserContext);

  const linkClasses = ({ isActive }: { isActive?: boolean }) => {
    return cn(
      'text-base font-medium hover:text-primary transition-colors py-1 rounded-full px-4',
      isActive ? activeClass : ''
    );
  };

  return (
    <div className="fixed border-b w-screen h-16 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4">
        <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
          {userContext && <RepositorySwitch />}
          <NavLink to="/mocks" className={linkClasses} end>
            Mocks
          </NavLink>
        </nav>
        <div className="ml-2 flex items-center space-x-4">
          {userContext ? (
            <UserNav />
          ) : (
            <NavLink to="/login" className={linkClasses} end>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
