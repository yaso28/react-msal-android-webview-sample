import { useAuth } from "@/features/auth/use-auth"
import { useState } from "react"

const MainPage = () => {
  const [token, setToken] = useState("")

  const {
    isAuthenticated,
    username,
    login,
    logout,
    acquireToken,
  } = useAuth()

  const handleLogin = async () => {
    try {
      await login()
    } catch (e) {
      console.error(e)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (e) {
      console.error(e)
    }
  }

  const handleAcquireToken = async () => {
    try {
      const token = await acquireToken()
      setToken(token)
    } catch (e) {
      console.error(e)
    }
  }

  const handleClearToken = () => {
    try {
      setToken("")
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <h1>React MSAL Android WebView Sample</h1>

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
    </>
  )
}

export default MainPage
