'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/shared/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { setToken } from '@/config';
import { useNavigate } from 'react-router-dom';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [accessToken, setAccessToken] = React.useState<string>('');
  const navigate = useNavigate();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 50);
    setToken(accessToken);
    navigate('/');
  }

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Github Access Token Required</h1>
        <p className="text-sm text-muted-foreground">
          Create <a href="https://github.com/settings/tokens/new">a classic Github Access Token</a> and paste it.
          <br />
          <strong className="text-muted">Remember to enable SAML if required.</strong>
        </p>
      </div>
      <div className={cn('grid gap-6', className)} {...props}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="accessToken">
                Access Token
              </Label>
              <Input
                className="bg-zinc-900 border-zinc-600"
                id="accessToken"
                placeholder="Access Token"
                type="text"
                onChange={(e) => setAccessToken(e.target.value)}
                autoCapitalize="none"
                autoComplete="text"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <Button disabled={isLoading} type="submit">
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </div>
        </form>
        <div className="flex flex-col space-y-2 text-center">
          <Popover>
            <PopoverTrigger asChild>
              <p className="text-muted underline text-xs">Why an Access Token, instead of OAuth?</p>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-zinc-900 border-zinc-600">
              <p className="text-sm text-muted-foreground">
                We store your Access Token in localStorage in the browser.
                <br />
                <br /> That way we can interact the Github API directly without a server.
              </p>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
}
