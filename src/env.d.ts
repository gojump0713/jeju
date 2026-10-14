interface ImportMetaEnv {
  readonly PUBLIC_REGISTRATION_API_URL?: string;
  readonly PUBLIC_REGISTRATION_STATUS?: 'open' | 'closed' | '';
  readonly PUBLIC_CONSENT_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
