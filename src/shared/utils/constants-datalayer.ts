export const DEFAULT_VALUES_LAYER = () => {
  const { href, search } = window.location;
  const urlParams = new URLSearchParams(search);

  return {
    site: {
      domain: "www.webmotors.com.br",
      country: "brasil",
      server: "web",
      environment: "comprar",
      subEnvironment: "comprar",
      tmsVersion: undefined,
      clientType: "pf",
      platform: "desktop",
      brandOrigin: urlParams.get("origem") || "webmotors",
    },
    page: {
      flowType: "fluxo-comprar",
      url: href,
      pageNameTier1: "comprar",
      trackingCode: {
        idcmp: urlParams.get("idcmp") || undefined,
        idcmpint: urlParams.get("idcmpint") || undefined,
        icid: urlParams.get("icid") || undefined,
        lkid: urlParams.get("lkid") || undefined,
      },
    },
  };
};

export const DATALAYER_PAGES_BASIC_INFO = () => {
  const { page: DEFAULT_PAGE_LAYER, ...rest } = DEFAULT_VALUES_LAYER();
  return {
    homepage: {
      ...rest,
      page: {
        ...DEFAULT_PAGE_LAYER,
        pageType: "homepage",
      },
    },
    searchResult: {
      ...rest,
      page: {
        ...DEFAULT_PAGE_LAYER,
        pageType: "resultado-de-busca",
      },
    },
    adDetail: {
      ...rest,
      page: {
        ...DEFAULT_PAGE_LAYER,
        pageType: "detalhe-de-anuncio",
      },
    },
    repechage: {
      ...rest,
      page: {
        ...DEFAULT_PAGE_LAYER,
        pageType: "repescagem",
      },
    },
    favoritesList: {
      ...rest,
      page: {
        ...DEFAULT_PAGE_LAYER,
        pageType: "lista-de-favoritos",
        pageName: "/webmotors/comprar/lista-de-favoritos",
        pageNameTier2: "lista-de-favoritos",
      },
    },
    videoCallScheduling: {
      ...rest,
      page: {
        ...DEFAULT_PAGE_LAYER,
        pageType: "agendamento-videochamada",
      },
    },
    videoCallSchedulingSuccess: {
      ...rest,
      page: {
        ...DEFAULT_PAGE_LAYER,
        pageType: "agendamento-videochamada-sucesso",
      },
    },
    comparator: {
      ...rest,
      page: {
        ...DEFAULT_PAGE_LAYER,
        pageType: "comparador",
      },
    },
    adDeactivatedSold: {
      ...rest,
      page: {
        ...DEFAULT_PAGE_LAYER,
        pageType: "anuncio-desativado",
      },
    },
  };
};

export const FIELDS_DATALAYER_NOT_TO_SANITIZE = [
  "veiculosMaisBuscados",
  "pageName",
  "url",
  "recommendationTimestamp",
  "idcmp",
  "idcmpint",
  "icid",
  "lkid",
];
