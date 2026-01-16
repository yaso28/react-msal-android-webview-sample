export const MSAL_CONFIG = {
  CLIENT_ID: import.meta.env.VITE_MSAL_CLIENT_ID as string,
  AUTHORITY: import.meta.env.VITE_MSAL_AUTHORITY as string,
  SCOPE: import.meta.env.VITE_MSAL_SCOPE as string,
} as const
