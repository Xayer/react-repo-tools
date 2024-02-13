import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { UserNav } from './UserNav';
import RepositorySwitch from './RepositorySwitch';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function DashboardPage() {
  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <RepositorySwitch /> <Navigation className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="h-screen my-2 mx-2 grid flex-col">
          <Outlet />
          <ReactQueryDevtools />
        </div>
      </div>
    </>
  );
}
