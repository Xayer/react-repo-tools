'use client';

import * as React from 'react';

import { cn, debounce } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Check, ChevronsUpDown, Loader } from 'lucide-react';
import { useFetchSearchAllRepositoriesForOrganization } from '@/queries/repositories';
import { FormEvent, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface OrganisationSwitchProps extends PopoverTriggerProps {
  className?: string;
}

export default function RepositorySwitch({ className }: OrganisationSwitchProps) {
  const [open, setOpen] = React.useState(false);
  const [showOrganisationDialog, setShowOrganisationDialog] = React.useState(false);
  const [organization] = React.useState<string>('cardlay');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const { repository } = useParams<{
    repository: string;
  }>();

  const [selectedRepository, setSelectedRepository] = React.useState<string>(repository || '');
  const navigate = useNavigate();
  const { data: repositories, isFetching: isLoadingRespositories } = useFetchSearchAllRepositoriesForOrganization({
    organization,
    enabled: open && searchQuery.length > 0,
    ...(searchQuery && { searchQuery }),
  });

  const shortcutKey = 'k';

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === shortcutKey && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((showOrganisationDialog) => !showOrganisationDialog);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const organizationName = React.useMemo(() => {
    return organization ? organization.charAt(0).toUpperCase() + organization.slice(1) : '';
  }, []);

  const updateSearch = useCallback((event: FormEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement)?.value;
    debounce(() => {
      setSearchQuery(value);
    }, 200)();
  }, []);

  const searchResults = useMemo(() => {
    if (!selectedRepository && !repositories) {
      return [];
    }

    return searchQuery.length > 0 ? repositories?.map((repository) => repository.name) : [selectedRepository];
  }, [repositories, searchQuery]);

  return (
    <Dialog open={showOrganisationDialog} onOpenChange={setShowOrganisationDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a repository"
            className={cn('w-[200px] justify-between overflow-hidden', className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarFallback>{selectedRepository.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            {selectedRepository}
            <div className="flex ml-auto items-center justify-center text-xs tracking-widest">
              <span className="mr-1 opacity-40 bg-muted rounded py-0.5 px-1">⌘{shortcutKey.toUpperCase()}</span>
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search repository..."
              onInput={(event: React.FormEvent<HTMLInputElement>) => updateSearch(event)}
            >
              {isLoadingRespositories && <Loader className="ml-auto h-4 w-4" />}
            </CommandInput>
            <CommandList>
              <CommandEmpty>No repository found.</CommandEmpty>
              <CommandGroup key={organization} heading={organizationName}>
                {searchResults?.map((repository) => (
                  <CommandItem
                    key={repository}
                    onSelect={() => {
                      setSelectedRepository(repository);
                      navigate(`/${organization}/${repository}`);
                      setOpen(false);
                    }}
                    className="text-base cursor-pointer"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarFallback>{repository.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {repository}
                    <Check
                      className={cn('ml-auto h-4 w-4', selectedRepository === repository ? 'opacity-100' : 'opacity-0')}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            {/* <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowOrganisationDialog(true);
                    }}
                  >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Add Repository
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList> */}
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create team</DialogTitle>
          <DialogDescription>Add a new organisation</DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Organisation name</Label>
              <Input id="name" placeholder="Organisation" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Subscription plan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">
                    <span className="font-medium">Free</span> -{' '}
                    <span className="text-muted-foreground">Trial for two weeks</span>
                  </SelectItem>
                  <SelectItem value="pro">
                    <span className="font-medium">Pro</span> -{' '}
                    <span className="text-muted-foreground">$9/month per user</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowOrganisationDialog(false)}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
