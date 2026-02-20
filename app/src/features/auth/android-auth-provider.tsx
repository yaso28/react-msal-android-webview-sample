import { MSAL_CONFIG } from "@/env"
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react"
import { AuthContext, type AuthContextValue } from "./auth-context"

type AndroidAuthProviderProps = {
  proxy: NonNullable<Window["AndroidProxy"]>,
  children: ReactNode,
}

export const AndroidAuthProvider = ({proxy, children}: AndroidAuthProviderProps) => {
  const [username, setUsername] = useState<string | undefined>(undefined)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const init = async () => {
      try {
        const name = await proxy.getUsername()
        setUsername(name)
        setIsAuthenticated(!!name)
      } catch {
        setIsAuthenticated(false)
      }
    }

    void init()
  }, [proxy])

  const login = useCallback(async () => {
  }, [])

  const logout = useCallback(async () => {
    await proxy.signOut()
  }, [proxy])

  const acquireToken = useCallback(async () => {
    return await proxy.acquireToken(MSAL_CONFIG.SCOPE)
  }, [proxy])

  const value = useMemo<AuthContextValue>(() => ({
    isAuthenticated,
    username,
    login,
    logout,
    acquireToken,
  }), [isAuthenticated, username, login, logout, acquireToken])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
