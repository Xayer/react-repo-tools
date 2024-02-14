import { useFetchTags } from '@/queries/tags';
import { MouseEventHandler, ReactNode, useCallback, useState } from 'react';
import { NavLink, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Loading from '../shared/Loading';
import { CheckCircle, Circle } from 'lucide-react';

export default function RepositoryTags() {
  const { organization, repository } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTagsKey = 'selected';
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTags, setSelectedTag] = useState<string[]>(searchParams.get(selectedTagsKey)?.split(',') || []);
  const {
    data: tags,
    isLoading,
    isError,
  } = useFetchTags({
    organization: organization as string,
    repository: repository as string,
    enabled: !!organization && !!repository,
  });

  const toggleValue = useCallback(
    (value: string, checked: boolean) => () => {
      let newSelectedTags = [...selectedTags];
      if (checked) {
        newSelectedTags.push(value);
      } else {
        newSelectedTags = newSelectedTags.filter((tag) => tag !== value);
      }
      setSelectedTag(newSelectedTags);
      if (newSelectedTags.length > 0) {
        setSearchParams({ [selectedTagsKey]: newSelectedTags.join(',') });
      } else {
        setSearchParams();
      }
    },
    [selectedTags]
  );

  const goToTag = useCallback(
    (tag: string) => {
      navigate({
        pathname: tag,
        search: searchParams.toString(),
      });
    },
    [location]
  );

  const TagItem = ({
    children,
    onClick,
  }: {
    children: ReactNode;
    showCheckmark?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
  }) => {
    return (
      <p
        onClick={onClick}
        className="hover:bg-muted flex-1 cursor-pointer whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-3 py-2 w-full"
      >
        {children}
      </p>
    );
  };
  return (
    <div className="flex h-full">
      <div className="space-y-4 w-56 max-h-max">
        <div className="mb-2 mr-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold tracking-tight">Tags</h2>
          <button className="text-sm hover:text-primary bg-muted rounded-full px-3 py-2">compare</button>
        </div>
        {isLoading && (
          <TagItem>
            <Loading />
          </TagItem>
        )}
        <div className="mr-4">
          {isError && <TagItem key="error">unable to fetch tags</TagItem>}
          {tags &&
            tags?.map((tag) => (
              <div className="justify-between flex items-center mb-2 gap-2" key={tag.name}>
                <TagItem
                  showCheckmark
                  onClick={() => {
                    goToTag(tag.name);
                  }}
                >
                  {tag.name}
                </TagItem>
                <button onClick={toggleValue(tag.name, !selectedTags.includes(tag.name))}>
                  {selectedTags.includes(tag.name) ? <CheckCircle /> : <Circle />}
                </button>
              </div>
            ))}
          {!isLoading && tags && tags.length === 0 && <TagItem key="no-tags">No tags</TagItem>}
        </div>
      </div>
      <div className="grow bg-muted w-100 h-100 p-4">
        <pre>{JSON.stringify(selectedTags)}</pre>
      </div>
    </div>
  );
}
