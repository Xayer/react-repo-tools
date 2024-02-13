import { getIssuesFromCommit } from '@/api/github';
import { useQuery } from '@tanstack/react-query';
export const fetchIssuesQueryKey = (organization: string, repository: string, commit: string) => [
  'issues',
  organization,
  repository,
  commit,
];
export const useFetchIssues = ({
  organization,
  repository,
  commit,
}: {
  organization: string;
  repository: string;
  commit: string;
}) => {
  return useQuery({
    queryKey: fetchIssuesQueryKey(organization, repository, commit),
    queryFn: ({ queryKey: [, organization, repository, commit] }) => {
      return getIssuesFromCommit({ organization, repository, commit });
    },
  });
};
