export type GithubSorting = 'stars' | 'forks' | 'help-wanted-issues' | 'updated';
export type GithubOrdering = 'asc' | 'desc';

export type GithubRepositoriesFiltering = {
  // sort: GithubSorting
  direction: GithubOrdering;
  per_page: number;
  page: number;
  searchQuery?: string;
};

export type GithubRepositorySearchResult = {
  name: string;
  id: string;
};
