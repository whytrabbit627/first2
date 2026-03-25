import { useState, useMemo } from 'react'
import { Search as SearchIcon, SearchX, X } from 'lucide-react'
import Fuse from 'fuse.js'
import { useAppContext } from '../context/AppContext'
import ContentCard from '../components/ContentCard/ContentCard'
import DetailModal from '../components/ContentCard/DetailModal'

// Highlight exact query string occurrences in text using a regex split.
// Returns a ReactNode[] if the query appears in text, otherwise undefined.
function highlightText(text, escapedQuery) {
  const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'))
  if (parts.length === 1) return undefined
  return parts.map((part, i) =>
    i % 2 === 1
      ? <mark key={i} className="bg-terracotta/25 rounded-sm px-px">{part}</mark>
      : part
  )
}

// Build highlights map for title and description fields.
function buildHighlights(item, query) {
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const map = {}
  const title = highlightText(item.title, escaped)
  const description = highlightText(item.description, escaped)
  if (title) map.title = title
  if (description) map.description = description
  return map
}

export default function Search() {
  const { allContent } = useAppContext()
  const [query, setQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)

  const fuse = useMemo(() => new Fuse(allContent, {
    keys: ['title', 'description', 'subcategory', 'tags'],
    threshold: 0.35,
    ignoreLocation: true,
  }), [allContent])

  const results = useMemo(() => {
    const q = query.trim()
    if (!q) return []
    return fuse.search(q).map(r => ({
      item: r.item,
      highlights: q.length >= 2 ? buildHighlights(r.item, q) : {},
    }))
  }, [query])

  const hasQuery = query.trim().length > 0

  return (
    <div className="flex flex-col min-h-full px-4 py-6">
      <h1 className="text-2xl font-semibold text-on-background mb-4">Search</h1>

      {/* Search input */}
      <div className="relative mb-6">
        <SearchIcon
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"
        />
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search resources…"
          autoComplete="off"
          className="w-full bg-surface-container rounded-xl pl-10 pr-10 py-3 text-on-background text-sm focus:outline-none focus:ring-2 focus:ring-secondary min-h-[44px]"
        />
        {hasQuery && (
          <button
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-300"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Results */}
      {!hasQuery && (
        <div className="flex flex-col items-center mt-16 gap-3 text-center">
          <SearchIcon size={32} className="text-gray-200" strokeWidth={1.5} />
          <p className="text-gray-400 text-sm">Search across all resources</p>
        </div>
      )}

      {hasQuery && results.length === 0 && (
        <div className="flex flex-col items-center mt-16 gap-3 text-center">
          <SearchX size={32} className="text-gray-200" strokeWidth={1.5} />
          <div>
            <p className="font-semibold text-on-background text-base">No results for "{query.trim()}"</p>
            <p className="text-gray-400 text-sm mt-1">Try different keywords or browse by category</p>
          </div>
        </div>
      )}

      {hasQuery && results.length > 0 && (
        <>
          <p className="text-xs text-gray-400 mb-4">
            {results.length} result{results.length === 1 ? '' : 's'}
          </p>
          <div className="flex flex-col gap-4">
            {results.map(({ item, highlights }) => (
              <ContentCard
                key={item.id}
                item={item}
                highlights={highlights}
                onClick={setSelectedItem}
              />
            ))}
          </div>
        </>
      )}

      {selectedItem && (
        <DetailModal key={selectedItem.id} item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  )
}
