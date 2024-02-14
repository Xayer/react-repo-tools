import Layout from '../shared/Layout';
import Login from '../pages/Login';
import AuthProvider from '../shared/AuthProvider';
import { createHashRouter } from 'react-router-dom';
import { lazy } from 'react';

const HomeScreen = lazy(() => import('@/components/pages/Home'));
const NotFoundScreen = lazy(() => import('@/components/pages/NotFound'));
const RepositoryScreen = lazy(() => import('@/components/pages/Repository'));
const RepositoryTagsScreen = lazy(() => import('@/components/pages/RepositoryTags'));

export const Router = createHashRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),

    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      {
        path: '/:organization/:repository',
        element: <RepositoryScreen />,
        children: [
          {
            path: 'tags',
            element: <RepositoryTagsScreen />,
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
]);
