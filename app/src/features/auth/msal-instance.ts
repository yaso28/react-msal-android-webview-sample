import { MSAL_CONFIG } from "@/env";
import { PublicClientApplication } from "@azure/msal-browser";

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: MSAL_CONFIG.CLIENT_ID,
    authority: MSAL_CONFIG.AUTHORITY,
    redirectUri: window.location.origin
  }
})
