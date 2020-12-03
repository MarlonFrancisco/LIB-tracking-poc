export type Datalayer = {
  site?: {
    domain?: string;
    country?: string;
    server?: string;
    environment?: string;
    subEnvironment?: string;
    tmsVersion?: number;
    clientType?: string;
    platform?: string;
    brandOrigin?: string;
  };
  page?: {
    flowType?: string;
    url?: string;
    pageNameTier1?: string;
    trackingCode?: {
      idcmp?: string;
      idcmpint?: string;
      icid?: string;
      lkid?: string;
    };
  };
};

declare global {
  interface Window {
    objDataLayer: Datalayer;
  }
}

export type TrackingData = {
  eventType: string;
  context: DATALAYER_PAGES;
  data: Datalayer;
};

export enum DATALAYER_PAGES {
  homepage,
  searchResult,
  adDetail,
  repechage,
  favoritesList,
  videoCallScheduling,
  videoCallSchedulingSuccess,
  comparator,
  adDeactivatedSold,
}
