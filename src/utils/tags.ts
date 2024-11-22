import { PullRequest, Comment } from '@/api/github';

export const getPullRequestNumber = (pullRequestData: PullRequest | undefined) => {
  return pullRequestData ? pullRequestData.number.toString() : '';
};
export const getPullRequestLink = (pullRequestData: PullRequest | undefined) => {
  return pullRequestData ? pullRequestData.html_url : '';
};

export const getJiraTasksFromPullRequestBody = (pullRequestBody: PullRequest | undefined) => {
  return [...new Set(pullRequestBody && pullRequestBody.body ? pullRequestBody.body.match(/([A-Z]+-\d+)/g) : null)];
};

export const getChangesFromPullRequestBody = (pullRequestBody: PullRequest | undefined) => {
  if (!pullRequestBody?.body) return null;
  const spacingRegex = /\\n|\\r|- |\n/gm;

  const regex = /(Changes in this PR:|Reason for the change\?)\r\n\r\n([\s\S]*?)(?=✂|#|$)/;
  const match = pullRequestBody?.body.match(regex);
  const changes = (match && match[2]) || '';
  return changes.split(spacingRegex).filter((change) => {
    return change.replace(spacingRegex, '').trim().length > 0;
  });
};

export const getTestReportsFromPullRequestComments = (comments: Comment[] | undefined) => {
  if (!comments || comments?.length === 0) return null;

  return comments
    ?.map((comment) => {
      const matches = comment.body.match(/Allure report: (.*)/);
      return matches ? matches[1] : false;
    })
    .filter(Boolean);
};

export const getPullRequestTagLink = (organization: string, repository: string, currentTag: string) => {
  return !!organization && !!repository && !!currentTag
    ? `https://github.com/${organization}/${repository}/releases/tag/${currentTag}`
    : null;
};
