import { MSAL_CONFIG } from "@/env"
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react"
import { AuthContext, type AuthContextValue } from "./auth-context"

type AndroidAuthProviderProps = {
  androidAuth: NonNullable<Window["AndroidAuth"]>,
  children: ReactNode,
}

export const AndroidAuthProvider = ({
  androidAuth,
  children,
}: AndroidAuthProviderProps) => {
  const [username, setUsername] = useState<string | undefined>(undefined)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const init = async () => {
      try {
        const name = await androidAuth.getUsername()
        setUsername(name)
        setIsAuthenticated(!!name)
      } catch {
        setIsAuthenticated(false)
      }
    }

    void init()
  }, [androidAuth])

  const login = useCallback(async () => {
    await androidAuth.signIn(MSAL_CONFIG.SCOPE)
  }, [androidAuth])

  const logout = useCallback(async () => {
    await androidAuth.signOut()
  }, [androidAuth])

  const acquireToken = useCallback(async () => {
    return await androidAuth.acquireToken(MSAL_CONFIG.SCOPE)
  }, [androidAuth])

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
