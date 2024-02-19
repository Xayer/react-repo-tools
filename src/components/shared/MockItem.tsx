import { cn } from '@/lib/utils';
import { useFetchPartnerMocks } from '@/queries/mocks';
import { Check, Loader2, X } from 'lucide-react';

export default function MockItem({ partner }: { partner: string }) {
  const { data: partnerMock, isFetching } = useFetchPartnerMocks({
    partner,
  });

  const isEnabled = partnerMock?.target !== 'PROXY';

  return (
    <div className="flex justify-between gap-1">
      <div className="flex justify-between gap-1">
        <i className="w-4 h-4 mr-2 text-primary">{isFetching && <Loader2 className="animate-spin" />}</i>
        {partner.charAt(0).toUpperCase() + partner.slice(1)}:
      </div>{' '}
      <div className={cn('flex', isEnabled ? 'text-secondary' : 'text-destructive')}>
        {partnerMock?.target === 'PROXY' ? <Check /> : <X />}
      </div>
    </div>
  );
}
