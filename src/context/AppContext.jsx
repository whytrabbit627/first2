import { createContext, useContext } from 'react'
import useUserProfile from '../hooks/useUserProfile'
import useBookmarks from '../hooks/useBookmarks'
import useContent from '../hooks/useContent'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const { profile, saveProfile, clearProfile } = useUserProfile()
  const { bookmarkIds, toggleBookmark, isBookmarked } = useBookmarks()
  const { allContent, contentReady } = useContent()

  return (
    <AppContext.Provider value={{ profile, saveProfile, clearProfile, bookmarkIds, toggleBookmark, isBookmarked, allContent, contentReady }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')
  return ctx
}
