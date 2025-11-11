/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LL_CLIENT_ID: string;
  readonly VITE_LL_ENDPOINT: string;
  readonly MODE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  dataLayer: any[];
  __OKTA_TOKEN__: string;
  __QUERY_PARAMS__?: string;
}
