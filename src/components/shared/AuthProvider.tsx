import { ReactNode, Suspense, createContext, useMemo } from 'react';
import { useFetchCurrentUser } from '@/queries/users';
import Loading from './Loading';
import { getAuthenticatedUser } from '@/api/github';
import { Navigate } from 'react-router-dom';

export const UserContext = createContext<Awaited<ReturnType<typeof getAuthenticatedUser>>['data'] | undefined>(
  undefined
);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { isLoading, error, data } = useFetchCurrentUser();
  const userData = useMemo(() => data?.data || undefined, [data]);

  if (isLoading) {
    return <Suspense fallback={<Loading />} />;
  }

  if (error) {
    return <Navigate to="/login" />;
  }

  return <UserContext.Provider value={userData}>{children}</UserContext.Provider>;
}
