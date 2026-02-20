import { MsalProvider, useMsal } from "@azure/msal-react"
import { useCallback, useMemo, type ReactNode } from "react"
import { AuthContext, type AuthContextValue } from "./auth-context"
import { msalInstance } from "./msal-instance"
import { MSAL_CONFIG } from "@/env"

type ReactAuthProviderProps = {
  children: ReactNode
}

const ReactAuthProviderInner = ({children}: ReactAuthProviderProps) => {
  const { instance, accounts } = useMsal()

  const account = accounts.length > 0 ? accounts[0] : undefined

  const login = useCallback(async () => {
    await instance.loginRedirect({
      scopes: [MSAL_CONFIG.SCOPE]
    })
  }, [instance])

  const logout = useCallback(async () => {
    await instance.logoutRedirect({
      onRedirectNavigate: () => false
    })
  }, [instance])

  const acquireToken = useCallback(async () => {
    const response = await instance.acquireTokenSilent({
      scopes: [MSAL_CONFIG.SCOPE],
      account
    })
    return response.accessToken
  }, [account, instance])

  const value = useMemo<AuthContextValue>(() => ({
    isAuthenticated: !!account,
    username: account?.name,
    login,
    logout,
    acquireToken,
  }), [account, login, logout, acquireToken])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const ReactAuthProvider = ({children}: ReactAuthProviderProps) => {
  return (
    <MsalProvider instance={msalInstance}>
      <ReactAuthProviderInner>
        {children}
      </ReactAuthProviderInner>
    </MsalProvider>
  )
}
