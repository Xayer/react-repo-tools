export type PartnerTarget = 'PROXY' | 'MOCK';
export type PartnerMockConfig = {
  target: PartnerTarget;
  'proxy-host': string;
  'proxy-port': string;
  'proxy-scheme': 'https';
};
