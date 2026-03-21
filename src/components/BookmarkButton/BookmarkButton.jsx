import { Bookmark } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'

export default function BookmarkButton({ itemId, className = '' }) {
  const { isBookmarked, toggleBookmark } = useAppContext()
  const saved = isBookmarked(itemId)

  return (
    <button
      onClick={e => {
        e.stopPropagation()
        toggleBookmark(itemId)
      }}
      aria-label={saved ? 'Remove bookmark' : 'Bookmark this resource'}
      className={`min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors ${className}`}
    >
      <Bookmark
        size={20}
        className={saved ? 'text-terracotta' : 'text-gray-300'}
        fill={saved ? 'currentColor' : 'none'}
        strokeWidth={1.8}
      />
    </button>
  )
}
