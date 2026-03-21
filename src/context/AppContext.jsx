import { createContext, useContext } from 'react'
import useUserProfile from '../hooks/useUserProfile'
import useBookmarks from '../hooks/useBookmarks'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const { profile, saveProfile, clearProfile } = useUserProfile()
  const { bookmarkIds, toggleBookmark, isBookmarked } = useBookmarks()

  return (
    <AppContext.Provider value={{ profile, saveProfile, clearProfile, bookmarkIds, toggleBookmark, isBookmarked }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')
  return ctx
}
