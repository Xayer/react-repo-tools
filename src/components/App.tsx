import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { Router } from './router/Router';
import { Suspense } from 'react';
import Loading from './shared/Loading';

const queryClient = new QueryClient();

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={Router} />
        </Suspense>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
