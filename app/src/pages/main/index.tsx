import { useAuth } from "@/features/auth/use-auth";
import { scan } from "@/features/scan/scan";
import axios from "axios";
import { useState } from "react";

const intenalUrl = "/sample.txt";
const externalUrl = "https://jsonplaceholder.typicode.com/posts/1";

const MainPage = () => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [scanResult, setScanResult] = useState("");
  const [httpResult, setHttpResult] = useState("");

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

  const handleFetch = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.text();
      setHttpResult(JSON.stringify(data));
    } catch (e) {
      console.error(e);
      setHttpResult(JSON.stringify(e));
    }
  };

  const handleAxios = async (url: string) => {
    try {
      const response = await axios.get(url);
      setHttpResult(JSON.stringify(response.data));
    } catch (e) {
      console.error(e);
      setHttpResult(JSON.stringify(e));
    }
  };

  const handleClearHttp = () => {
    try {
      setHttpResult("");
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
            <p className="value">username: {username}</p>

            <button onClick={handleAcquireToken}>Acquire Token</button>
            <button onClick={handleClearToken}>Clear Token</button>
            <p className="value">token: {token}</p>
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
        <p className="value">scan: {scanResult}</p>
      </div>

      <div>
        <button onClick={() => handleFetch(intenalUrl)}>Fetch Internal</button>
        <button onClick={() => handleFetch(externalUrl)}>Fetch External</button>
        <button onClick={() => handleAxios(intenalUrl)}>Axios Internal</button>
        <button onClick={() => handleAxios(externalUrl)}>Axios External</button>
        <button onClick={handleClearHttp}>Clear Http</button>
        <p className="value">http: {httpResult}</p>
      </div>
    </>
  );
};

export default MainPage;
