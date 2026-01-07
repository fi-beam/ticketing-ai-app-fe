/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_ENABLE_MOCK_API: string
  readonly VITE_AI_FEATURE_FLAG: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
