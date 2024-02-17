import { ReactNode, Suspense, createContext, useMemo } from 'react';
import { useFetchCurrentUser } from '@/queries/users';
import Loading from './Loading';
import { getAuthenticatedUser } from '@/api/github';

export const UserContext = createContext<Awaited<ReturnType<typeof getAuthenticatedUser>>['data'] | undefined>(
  undefined
);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { isLoading, data } = useFetchCurrentUser();
  const userData = useMemo(() => data?.data || undefined, [data]);

  if (isLoading) {
    return <Suspense fallback={<Loading />} />;
  }

  return <UserContext.Provider value={userData}>{children}</UserContext.Provider>;
}
