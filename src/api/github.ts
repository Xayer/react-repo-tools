/* eslint-disable camelcase */
import { getGithubAuthHeader, getTokenFromStorage } from '@/config';
import type { GithubRepositoriesFiltering } from '@/types/github';
import { Octokit } from '@octokit/rest';

export type GithubRefTag = {
  ref: string;
  node_id: string;
  url: string;
  object: {
    sha: string;
    type: string;
    url: string;
  };
};

export type GithubTag = GithubRefTag & {
  name: `v${number}.${number}.${number}`;
};

export interface PullRequest {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: unknown;
  labels?: unknown[] | null;
  state: string;
  locked: boolean;
  assignee?: null;
  assignees?: null[] | null;
  milestone?: null;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string;
  author_association: string;
  active_lock_reason?: null;
  draft: boolean;
  pull_request: {
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    merged_at: string;
  };
  body: string;
  reactions: unknown;
  timeline_url: string;
  performed_via_github_app?: null;
  state_reason?: null;
  score: number;
}

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface Comment {
  url: string;
  html_url: string;
  issue_url: string;
  id: number;
  node_id: string;
  user: User;
  created_at: string;
  updated_at: string;
  author_association: string;
  body: string;
  reactions: unknown;
  performed_via_github_app?: null;
}

export interface Repository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: User;
  html_url: string;
  description?: null;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage?: null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url?: null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license?: null;
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics?: null[] | null;
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  permissions: unknown;
}

export const getTags = async ({ organization, repository }: { organization: string; repository: string }) => {
  if (!organization || !repository) return Promise.reject(new Error('organization or repository is missing'));

  return await fetch(`https://api.github.com/repos/${organization}/${repository}/git/refs/tags`, {
    headers: {
      Authorization: getGithubAuthHeader(),
    },
  }).then(async (response) => {
    if (response.status === 200) {
      const allRefs = (await response.json()) as GithubRefTag[];
      // only return the general tags, and not the web-design-token, web-ui, and web-portal specific tags
      return allRefs.reduce((acc, ref) => {
        const refTag = ref.ref.match(/^refs\/tags\/(v\d+\.\d+\.\d+)$/);
        if (ref.object.type === 'tag' && refTag) {
          (acc as (GithubRefTag & { name: string })[]).push({
            ...ref,
            name: refTag[1],
          });
        }
        return acc;
      }, []) as GithubTag[];
    } else if (response.status === 404) {
      throw new Error('no tags found');
    } else {
      throw new Error('failed to fetch tags');
    }
  });
};

export const getTag = async ({
  organization,
  repository,
  tag,
}: {
  organization: string;
  repository: string;
  tag: string;
}) => {
  return await fetch(`https://api.github.com/repos/${organization}/${repository}/git/tags/${tag}`, {
    headers: {
      Authorization: getGithubAuthHeader(),
    },
  }).then(async (response) => {
    if (response.status === 200) {
      // only return the general tags, and not the web-design-token, web-ui, and web-portal specific tags
      return (await response.json()) as GithubTag;
    } else {
      throw new Error('Failed to fetch tags');
    }
  });
};

export const getRefTag = async ({
  organization,
  repository,
  tag,
}: {
  organization: string;
  repository: string;
  tag: string;
}) => {
  return await fetch(`https://api.github.com/repos/${organization}/${repository}/git/refs/tags/${tag}`, {
    headers: {
      Authorization: getGithubAuthHeader(),
    },
  }).then(async (response) => {
    if (response.status === 200) {
      // only return the general tags, and not the web-design-token, web-ui, and web-portal specific tags
      return (await response.json()) as GithubRefTag;
    } else {
      throw new Error('Failed to fetch ref tag');
    }
  });
};

// https://api.github.com/search/issues?q=

export const getIssuesFromCommit = async ({
  organization,
  repository,
  commit,
}: {
  organization: string;
  repository: string;
  commit: string;
}) => {
  return await fetch(`https://api.github.com/search/issues?q=repo:${organization}/${repository}+sha:${commit}`, {
    headers: {
      Authorization: getGithubAuthHeader(),
    },
  }).then(async (response) => {
    if (response.status === 200) {
      return (await response.json()) as { items: PullRequest[] };
    } else {
      throw new Error('Failed to fetch issues from commit');
    }
  });
};

export const getCommentsFromPullRequest = async ({
  organization,
  repository,
  pullRequestNumber,
}: {
  organization: string;
  repository: string;
  pullRequestNumber: string;
}) => {
  return await fetch(
    `https://api.github.com/repos/${organization}/${repository}/issues/${pullRequestNumber}/comments`,
    {
      headers: {
        Authorization: getGithubAuthHeader(),
      },
    }
  ).then(async (response) => {
    if (response.status === 200) {
      return ((await response.json()) as Comment[])
        .filter((item) => {
          return item.user.login === 'e2e-bot[bot]';
        })
        .filter(Boolean);
    } else {
      throw new Error('Failed to get comments from pull request');
    }
  });
};

export const getAllRepositoriesForOrganization = async ({ organization }: { organization: string }) => {
  return await fetch(`https://api.github.com/orgs/${organization}/repos`, {
    headers: {
      Authorization: getGithubAuthHeader(),
    },
  }).then(async (response) => {
    if (response.status === 200) {
      return (await response.json()) as Repository[];
    } else {
      throw new Error('Failed to get all repositories for organization');
    }
  });
};

export const githubApiInstance = new Octokit({
  auth: getTokenFromStorage(),
});

export const getAllRepositoriesFromOrganization = async ({
  organization,
  searchQuery,
  per_page,
  page,
  direction,
}: {
  organization: string;
} & GithubRepositoriesFiltering) => {
  return githubApiInstance.rest.search.repos({
    q: `${searchQuery ? `${searchQuery} in:name,description` : ''} org:${organization}`,
    per_page,
    page,
    direction,
  });
};

export const getAuthenticatedUser = async () => {
  return githubApiInstance.rest.users.getAuthenticated();
};
