import { getAuthenticatedUser } from '@/api/github';
import { getTokenFromStorage } from '@/config';
import { useQuery } from '@tanstack/react-query';

export const useFetchCurrentUser = () => {
  const token = getTokenFromStorage();
  return useQuery({
    queryKey: ['currentUser', token],
    queryFn: () => {
      return getAuthenticatedUser();
    },
  });
};
