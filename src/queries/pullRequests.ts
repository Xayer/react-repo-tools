import { getCommentsFromPullRequest, getIssuesFromCommit, getRefTag, getTag } from '@/api/github';
import { useQueries, useQuery } from '@tanstack/react-query';

export const useFetchPullRequestFromRefTag = ({
  organization,
  repository,
  tag,
  enabled,
}: {
  organization: string;
  repository: string;
  tag: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ['PrFromRefTag', organization, repository, tag],
    refetchOnWindowFocus: false,
    enabled,
    queryFn: async ({ queryKey: [, organization, repository, tag] }) =>
      await getRefTag({ organization, repository, tag })
        .then(({ object: { sha: refSha } }) =>
          getTag({ organization, repository, tag: refSha }).then((tag) =>
            getIssuesFromCommit({
              organization,
              repository,
              commit: tag.object.sha,
            })
          )
        )
        .then(({ items: [pullRequest] }) => pullRequest),
  });
};

export const useFetchPullRequestData = (selectedTags: string[], organization: string, repository: string) => {
  return useQueries({
    queries: selectedTags.map((tag) => ({
      queryKey: ['PrFromRefTag', organization, repository, tag],
      refetchOnWindowFocus: false,
      queryFn: async () =>
        await getRefTag({ organization, repository, tag })
          .then(({ object: { sha: refSha } }) =>
            getTag({ organization, repository, tag: refSha }).then((tag) =>
              getIssuesFromCommit({
                organization,
                repository,
                commit: tag.object.sha,
              })
            )
          )
          .then(({ items: [pullRequest] }) => pullRequest),
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
        error: results.some((result) => result.isError),
      };
    },
  });
};

export const useFetchPullRequestCommentsWithTests = ({
  organization,
  repository,
  pullRequestNumber,
  enabled,
}: {
  organization: string;
  repository: string;
  pullRequestNumber: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ['CommentsFromPullRequest', organization, repository, pullRequestNumber],
    enabled,
    queryFn: ({ queryKey: [, organization, repository, pullRequestNumber] }) =>
      getCommentsFromPullRequest({
        organization: organization as string,
        repository: repository as string,
        pullRequestNumber: pullRequestNumber as string,
      }),
  });
};

export const useFetchPullRequestsCommentsWithTests = ({
  pullRequestNumbers,
  organization,
  repository,
  enabled,
}: {
  pullRequestNumbers: string[];
  organization: string;
  repository: string;
  enabled: boolean;
}) => {
  return useQueries({
    queries: pullRequestNumbers.map((pullRequestNumber) => ({
      queryKey: ['CommentsFromPullRequest', organization, repository, pullRequestNumber],
      enabled,
      queryFn: () =>
        getCommentsFromPullRequest({
          organization: organization as string,
          repository: repository as string,
          pullRequestNumber: pullRequestNumber as string,
        }),
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
        error: results.some((result) => result.isError),
      };
    },
  });
};
