import { lazy, Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import Loading from '@/components/shared/Loading';
import Layout from '../shared/Layout';
import Login from '../pages/Login';

const HomeScreen = lazy(() => import('@/components/pages/Home'));
const NotFoundScreen = lazy(() => import('@/components/pages/NotFound'));

export default function Router() {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomeScreen />,
        },
        {
          path: ':organisation',
          element: <HomeScreen />,
          children: [
            {
              path: ':repository',
              element: <HomeScreen />,
            },
          ],
        },
        {
          path: '*',
          element: <NotFoundScreen />,
        },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
  ];
  const element = useRoutes(routes);

  return <Suspense fallback={<Loading />}>{element}</Suspense>;
}
