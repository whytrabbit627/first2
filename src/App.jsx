import { Component } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useAppContext } from './context/AppContext'
import Layout from './components/Layout/Layout'

class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <p className="font-semibold text-on-background text-lg mb-2">Something went wrong</p>
          <p className="text-gray-400 text-sm mb-4">Try refreshing the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white rounded-full px-6 py-3 font-medium text-sm min-h-[44px]"
          >
            Refresh
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

// Pages (stubs — filled in per sprint)
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import Category from './pages/Category'
import Search from './pages/Search'
import Bookmarks from './pages/Bookmarks'
import PostPage from './pages/PostPage/PostPage'

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
      <Route
        path="/posts/:slug"
        element={
          <RequireProfile>
            <PostPage />
          </RequireProfile>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
