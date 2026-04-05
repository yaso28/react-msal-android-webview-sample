import type { ReactNode } from "react"
import { AndroidAuthProvider } from "./android-auth-provider"
import { ReactAuthProvider } from "./react-auth-provider"

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({children}: AuthProviderProps) => {
  if (window.AndroidAuth) {
    return (
      <AndroidAuthProvider androidAuth={window.AndroidAuth}>
        {children}
      </AndroidAuthProvider>
    )
  }

  return (
    <ReactAuthProvider>
      {children}
    </ReactAuthProvider>
  )
}
