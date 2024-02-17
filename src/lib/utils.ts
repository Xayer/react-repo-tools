import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce(fn: Function, ms = 300) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}

export function copyToClipboard(text: string) {
  return navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success('Copied to clipboard');
    })
    .catch(() => {
      toast.error('Failed to copy to clipboard');
    });
}
