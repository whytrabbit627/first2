import { useState } from 'react'

const STORAGE_KEY = 'first2_bookmarks'

function readBookmarks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeBookmarks(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

export default function useBookmarks() {
  const [bookmarkIds, setBookmarkIds] = useState(() => readBookmarks())

  function toggleBookmark(id) {
    setBookmarkIds(prev => {
      const next = prev.includes(id)
        ? prev.filter(b => b !== id)
        : [...prev, id]
      writeBookmarks(next)
      return next
    })
  }

  function isBookmarked(id) {
    return bookmarkIds.includes(id)
  }

  return { bookmarkIds, toggleBookmark, isBookmarked }
}
