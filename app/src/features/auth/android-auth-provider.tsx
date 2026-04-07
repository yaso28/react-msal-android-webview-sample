import { MSAL_CONFIG } from "@/env";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AuthContext, type AuthContextValue } from "./auth-context";

type AndroidAuthProviderProps = {
  androidAuth: NonNullable<Window["AndroidAuth"]>;
  children: ReactNode;
};

export const AndroidAuthProvider = ({
  androidAuth,
  children,
}: AndroidAuthProviderProps) => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const refreshAuthState = useCallback(async () => {
    const name = await androidAuth.getUsername();
    setUsername(name);
    setIsAuthenticated(!!name);
  }, [androidAuth]);

  useEffect(() => {
    const run = async () => {
      try {
        await refreshAuthState();
      } catch (e) {
        console.error(e);
      }
    };

    void run();
  }, [refreshAuthState]);

  const login = useCallback(async () => {
    await androidAuth.signIn(MSAL_CONFIG.SCOPE);
    await refreshAuthState();
  }, [androidAuth, refreshAuthState]);

  const logout = useCallback(async () => {
    await androidAuth.signOut();
    await refreshAuthState();
  }, [androidAuth, refreshAuthState]);

  const acquireToken = useCallback(async () => {
    return await androidAuth.acquireToken(MSAL_CONFIG.SCOPE);
  }, [androidAuth]);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      username,
      login,
      logout,
      acquireToken,
    }),
    [isAuthenticated, username, login, logout, acquireToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
