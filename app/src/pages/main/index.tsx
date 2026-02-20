import { useAuth } from "@/features/auth/use-auth";
import { scan } from "@/features/scan/scan";
import { useState } from "react";

const MainPage = () => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [scanResult, setScanResult] = useState("");

  const { isAuthenticated, username, login, logout, acquireToken } = useAuth();

  const handleLogin = async () => {
    try {
      await login();
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error(e);
    }
  };

  const handleAcquireToken = async () => {
    try {
      const token = await acquireToken();
      setToken(token);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearToken = () => {
    try {
      setToken(undefined);
    } catch (e) {
      console.error(e);
    }
  };

  const handleScan = () => {
    try {
      const result = scan();
      setScanResult(result);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearScan = () => {
    try {
      setScanResult("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h1>React MSAL Android WebView Sample</h1>

      <div>
        {isAuthenticated ? (
          <>
            <button onClick={handleLogout}>Logout</button>
            <p>username: {username}</p>

            <button onClick={handleAcquireToken}>Acquire Token</button>
            <button onClick={handleClearToken}>Clear Token</button>
            <p>token: {token}</p>
          </>
        ) : (
          <>
            <button onClick={handleLogin}>Login</button>
          </>
        )}
      </div>

      <div>
        <button onClick={handleScan}>Scan</button>
        <button onClick={handleClearScan}>Clear Scan</button>
        <p>scan: {scanResult}</p>
      </div>
    </>
  );
};

export default MainPage;
