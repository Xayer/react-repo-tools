import Layout from '../shared/Layouts/Layout';
import Login from '../pages/Login';
import AuthProvider from '../shared/AuthProvider';
import { createHashRouter } from 'react-router-dom';
import { lazy } from 'react';
import RepositoryLayout from '@/components/shared/Layouts/RepositoryLayout';

const HomeScreen = lazy(() => import('@/components/pages/Home'));
const NotFoundScreen = lazy(() => import('@/components/pages/NotFound'));
const RepositoryScreen = lazy(() => import('@/components/pages/Repository'));
const RepositoryTagsScreen = lazy(() => import('@/components/shared/Layouts/RepositoryTagsLayout'));
const TagScreen = lazy(() => import('@/components/pages/Tag'));
const MocksScreen = lazy(() => import('@/components/pages/Mocks'));

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
        path: '/mocks',
        element: <MocksScreen />,
      },
      {
        path: '/:organization/:repository',
        element: <RepositoryLayout />,
        children: [
          {
            index: true,
            element: <RepositoryScreen />,
          },
          {
            path: 'tags',
            element: <RepositoryTagsScreen />,
            children: [
              {
                path: ':tag',
                element: <TagScreen />,
              },
            ],
          },
        ],
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: '*',
        element: <NotFoundScreen />,
      },
    ],
  },
]);
