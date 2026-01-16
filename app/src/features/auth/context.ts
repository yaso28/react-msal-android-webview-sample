import { createContext } from "react"

export type AuthContextValue = {
  isAuthenticated: boolean,
  username: string | undefined,
  login: () => Promise<void>,
  logout: () => Promise<void>,
  acquireToken: () => Promise<string>,
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
