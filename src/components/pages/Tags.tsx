import { useParams, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { selectedTagsKey } from '../shared/Layouts/RepositoryTagsLayout';
import { useFetchPullRequestData, useFetchPullRequestsCommentsWithTests } from '@/queries/pullRequests';
import { getPullRequestNumber } from '@/utils/tags';

export default function Tags() {
  const { repository, organization } = useParams();
  const [searchParams] = useSearchParams();

  const selectedTags = useMemo(() => searchParams.get(selectedTagsKey)?.split(',') || [], [searchParams]);

  //   const getTagComments = useCallback(
  //     (pullRequestNumber: string) => {
  //       return useFetchPullRequestCommentsWithTests({
  //         organization: organization as string,
  //         repository: repository as string,
  //         pullRequestNumber: pullRequestNumber.toString(),
  //         enabled: !!pullRequestNumber,
  //       });
  //     },
  //     [selectedTags]
  //   );

  //   const tags = useMemo(() => {
  //     const tagsData = selectedTags
  //       .map((tag) => {
  //         const { isError, data } = getTagData(tag);

  //         if (isError) {
  //           return false;
  //         }

  //         const pullRequestNumber = getPullRequestNumber(data);

  //         const { data: commentsWithTests } = getTagComments(pullRequestNumber);

  //         return {
  //           prLink: getPullRequestLink(data),
  //           prNumber: pullRequestNumber,
  //           tagLink: getPullRequestTagLink(organization as string, repository as string, tag),
  //           jiraTasks: getJiraTasksFromPullRequestBody(data),
  //           changeLog: getChangesFromPullRequestBody(data),
  //           testReports: commentsWithTests ? getTestReportsFromPullRequestComments(commentsWithTests) : [],
  //         };
  //       })
  //       .filter(Boolean);

  //     return tagsData;
  //   }, [selectedTags]);

  const { data: tags } = useFetchPullRequestData(selectedTags, organization as string, repository as string);

  const pullRequestNumbers = useMemo(() => (tags ? tags.map((tag) => getPullRequestNumber(tag)) : []), [tags]);

  const comments = useFetchPullRequestsCommentsWithTests({
    organization: organization as string,
    repository: repository as string,
    pullRequestNumbers,
    enabled: !!selectedTags.length,
  });

  console.log(comments);

  return (
    <div className="flex flex-col">
      <h2 className="text-xl mb-3 flex items-center justify-start gap-2">Changelog {selectedTags.join(', ')}</h2>
    </div>
  );
}
