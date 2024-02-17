import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function DashboardPage() {
  return (
    <>
      <Navigation />
      <div className="mt-16 px-4 h-100">
        <Outlet />
        <ReactQueryDevtools />
      </div>
    </>
  );
}
