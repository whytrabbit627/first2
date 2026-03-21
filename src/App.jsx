import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useAppContext } from './context/AppContext'
import Layout from './components/Layout/Layout'

// Pages (stubs — filled in per sprint)
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import Category from './pages/Category'
import Search from './pages/Search'
import Bookmarks from './pages/Bookmarks'

function RequireProfile({ children }) {
  const { profile } = useAppContext()
  if (!profile) return <Navigate to="/" replace />
  return <Layout>{children}</Layout>
}

function RootRedirect() {
  const { profile } = useAppContext()
  if (profile) return <Navigate to="/home" replace />
  return <Onboarding />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route
        path="/home"
        element={
          <RequireProfile>
            <Home />
          </RequireProfile>
        }
      />
      <Route
        path="/category/:slug"
        element={
          <RequireProfile>
            <Category />
          </RequireProfile>
        }
      />
      <Route
        path="/search"
        element={
          <RequireProfile>
            <Search />
          </RequireProfile>
        }
      />
      <Route
        path="/bookmarks"
        element={
          <RequireProfile>
            <Bookmarks />
          </RequireProfile>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  )
}
