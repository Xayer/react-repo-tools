import { fetchPartnerMocks } from '@/api/cardlay';
import { PartnerMockConfig } from '@/types/cardlay';
import { useQuery } from '@tanstack/react-query';

export const useFetchPartnerMocks = ({ partner }: { partner: string }) => {
  return useQuery<PartnerMockConfig>({
    queryKey: ['partnerMocks', partner],
    queryFn: () => fetchPartnerMocks(partner),
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
  });
};
