import { getAllRepositoriesForOrganization, getAllRepositoriesFromOrganization } from '@/api/github';
import { GithubOrdering } from '@/types/github';
import { useQuery } from '@tanstack/react-query';

export const useFetchAllRepositoriesForOrganization = ({
  organization,
  enabled,
}: {
  organization: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ['allRepositories', organization],
    refetchOnWindowFocus: false,
    queryFn: async ({ queryKey: [, organization] }) => {
      return await getAllRepositoriesForOrganization({ organization });
    },
    enabled,
  });
};

export const useFetchSearchAllRepositoriesForOrganization = ({
  organization,
  enabled,
  perPage = 4,
  searchQuery,
  page = 1,
  direction = 'asc' as GithubOrdering,
}: {
  organization: string;
  enabled: boolean;
  searchQuery?: string;
  perPage?: number;
  page?: number;
  direction?: GithubOrdering;
}) => {
  const {
    data: repositories,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ['searchAllRepositories', organization, searchQuery, perPage, page, direction],
    refetchOnWindowFocus: false,
    queryFn: async ({ queryKey }) => {
      const params = {
        organization,
        per_page: perPage,
        page,
        direction: direction,
        ...(searchQuery && { searchQuery }),
      };

      return await getAllRepositoriesFromOrganization(params);
    },
    enabled,
  });

  return { data: repositories?.data.items, isError, isFetching };
};
