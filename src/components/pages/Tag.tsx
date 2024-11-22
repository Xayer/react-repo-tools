import { useFetchPullRequestCommentsWithTests, useFetchPullRequestFromRefTag } from '@/queries/pullRequests';
import { useParams } from 'react-router-dom';
import Loading from '../shared/Loading';
import { createRef, useMemo } from 'react';
import { Comment } from '@/api/github';
import { copyToClipboard } from '@/lib/utils';
import { Copy } from 'lucide-react';
import {
  getChangesFromPullRequestBody,
  getJiraTasksFromPullRequestBody,
  getPullRequestLink,
  getPullRequestNumber,
  getPullRequestTagLink,
  getTestReportsFromPullRequestComments,
} from '@/utils/tags';

export default function Tag() {
  const { tag: currentTag, repository, organization } = useParams();

  const {
    data: pullRequestData,
    isLoading,
    isError,
  } = useFetchPullRequestFromRefTag({
    organization: organization as string,
    repository: repository as string,
    tag: currentTag as string,
    enabled: !!organization && !!repository && !!currentTag,
  });

  const pullRequestNumber = useMemo(() => {
    return getPullRequestNumber(pullRequestData);
  }, [pullRequestData]);

  const shouldFetchData = useMemo(() => {
    return !!organization && !!repository && !!pullRequestNumber;
  }, [organization, repository, pullRequestNumber]);

  const pullRequestLink = useMemo(() => getPullRequestLink(pullRequestData), [pullRequestData]);

  const jiraTasks = useMemo(() => getJiraTasksFromPullRequestBody(pullRequestData), [pullRequestData]);

  const pullRequestChanges = useMemo(() => getChangesFromPullRequestBody(pullRequestData), [pullRequestData]);

  const { data: commentsWithTests } = useFetchPullRequestCommentsWithTests({
    organization: organization as string,
    repository: repository as string,
    pullRequestNumber: pullRequestNumber as string,
    enabled: shouldFetchData,
  });

  const testReports = useMemo(
    () => getTestReportsFromPullRequestComments(commentsWithTests as Comment[]),
    [commentsWithTests]
  );

  const versionLink = useMemo(
    () => getPullRequestTagLink(organization as string, repository as string, currentTag as string),
    [organization, repository, currentTag]
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Unable to fetch tag</div>;
  }

  const ref = createRef<HTMLPreElement>();

  const copyTextFromDescription = () => {
    copyToClipboard(ref.current?.innerText as string);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl">{currentTag}</h2>
        <nav className="flex gap-1">
          {pullRequestLink && (
            <a className="underline" href={pullRequestLink}>
              Pull Request
            </a>
          )}
          {testReports && (
            <a className="underline" href={testReports.at(-1) as string}>
              Test Report
            </a>
          )}
          {versionLink && (
            <a className="underline" href={versionLink}>
              {currentTag}
            </a>
          )}
        </nav>
      </div>
      <h2 className="text-xl mb-3 flex items-center justify-start gap-2">
        Changelog (Markdown){' '}
        <button onClick={copyTextFromDescription}>
          <Copy />
        </button>
      </h2>
      <pre ref={ref} className="text-wrap max-w-prose w-full p-2 py-4">
        - {currentTag}: {jiraTasks?.join(', ')}{' '}
        {testReports && testReports?.length > 0 && `[Test Report](${testReports?.at(-1)})`}
        {pullRequestChanges && (
          <ul className="flex flex-col">
            {pullRequestChanges
              .map((change) => {
                return <li key={change}>{`  - ${change}`}</li>;
              })
              .filter(Boolean)}
          </ul>
        )}
      </pre>
    </div>
  );
}
