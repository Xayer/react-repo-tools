import { NavLink, Outlet, useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useFetchRepository } from '@/queries/repositories';
import { createContext } from 'react';
import { getRepository } from '@/api/github';
import Loading from '../Loading';

export const RepositoryContext = createContext<Awaited<ReturnType<typeof getRepository>> | undefined>(undefined);

export default function RepositoryLayout() {
  const activeClass = 'bg-muted';

  const linkClasses = ({ isActive, ...props }: { isActive?: boolean }) => {
    return cn(
      'text-base font-medium hover:text-primary transition-colors py-1 rounded-full px-4',
      isActive ? activeClass : ''
    );
  };

  const { organization, repository } = useParams();

  const {
    data: repositoryData,
    isError,
    isLoading,
  } = useFetchRepository({
    organization: organization as string,
    repository: repository as string,
    enabled: !!organization && !!repository,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Failed to load repository</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center justify-between">
          <h1>
            {repositoryData?.name}
            {repositoryData?.visibility && <span className="ml-2 text-accent">(private)</span>}
          </h1>
          <a
            href={`https://github.com/${organization}/${repository}`}
            className="text-primary hover:text-primary transition-colors py-1 rounded-full px-4"
          >
            Github
          </a>
        </div>
        <nav className={cn('flex mx-6 items-center space-x-4 lg:space-x-6')}>
          {organization && repository && (
            <>
              <NavLink to={`/${organization}/${repository}`} className={linkClasses} end>
                Overview
              </NavLink>
              <NavLink to={`/${organization}/${repository}/tags`} className={linkClasses}>
                Tags
              </NavLink>
            </>
          )}
        </nav>
      </div>
      <RepositoryContext.Provider value={repositoryData}>
        <Outlet />
      </RepositoryContext.Provider>
    </div>
  );
}
