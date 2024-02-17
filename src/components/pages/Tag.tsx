import { useFetchPullRequestFromRefTag } from '@/queries/pullRequests';
import { useParams } from 'react-router-dom';
import Loading from '../shared/Loading';
import { useMemo } from 'react';

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

  const pullRequestLink = useMemo(() => (!pullRequestData ? null : pullRequestData?.html_url), [pullRequestData]);

  const jiraTasks = useMemo(() => {
    return pullRequestData?.body ? pullRequestData?.body.match(/([A-Z]+-\d+)/g) : null;
  }, []);
  const pullRequestChanges = useMemo(() => {
    if (!pullRequestData?.body) return null;
    const spacingRegex = /\\n|\\r|- /gm;

    const regex = /Changes in this PR:\r\n\r\n([\s\S]*?)(?=✂|$)/;
    const match = pullRequestData?.body.match(regex);
    const changes = (match && match[1]) || '';
    return changes.split(spacingRegex).filter((change) => {
      return change.replace(spacingRegex, '').trim().length > 0;
    });
  }, [pullRequestData]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Unable to fetch tag</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex max-w-prose items-center justify-between">
        <h3 className="text-lg">{currentTag}</h3>
        <nav>
          {pullRequestLink && (
            <a className="underline" href={pullRequestLink}>
              Pull Request
            </a>
          )}
        </nav>
      </div>
      <pre className="text-wrap">
        {jiraTasks?.map((task) => (
          <div key={task}>{task}</div>
        ))}

        {pullRequestChanges && (
          <ul className="flex flex-col">
            {pullRequestChanges
              .map((change) => {
                return <li key={change}> - {change}</li>;
              })
              .filter(Boolean)}
          </ul>
        )}
      </pre>
    </div>
  );
}
