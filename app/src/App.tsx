import { lazy } from 'react'
import './App.css'
import { AuthProvider } from './features/auth/auth-provider'

const MainPage = lazy(() => import("@/pages/main"))

const App = () => {
  return (
    <AuthProvider>
      <MainPage />
    </AuthProvider>
  )
}

export default App
