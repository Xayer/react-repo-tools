import { PartnerMockConfig } from '@/types/cardlay';

export const fetchPartnerMocks = (partner: string) => {
  const corsProxy = 'https://dashboard-backend.netlify.app/.netlify/functions/cors/';

  return fetch(
    `${corsProxy}https://mock-gateway-service.stage.cardlay.io/api/partner-mock/${partner}/partner-mock/config`,
    {
      method: 'PATCH',
      body: JSON.stringify({}),
    }
  ).then((response) => {
    return response.json() as unknown as PartnerMockConfig;
  });
};
