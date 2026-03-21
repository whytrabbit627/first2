import { useState, useMemo } from 'react'
import { Search as SearchIcon, X } from 'lucide-react'
import Fuse from 'fuse.js'
import allContent from '../data/content.json'
import ContentCard from '../components/ContentCard/ContentCard'
import DetailModal from '../components/ContentCard/DetailModal'

const fuse = new Fuse(allContent, {
  keys: ['title', 'description', 'subcategory', 'tags'],
  threshold: 0.35,
  ignoreLocation: true,
})

export default function Search() {
  const [query, setQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)

  const results = useMemo(() => {
    const q = query.trim()
    if (!q) return []
    return fuse.search(q).map(r => r.item)
  }, [query])

  const hasQuery = query.trim().length > 0

  return (
    <div className="flex flex-col min-h-full px-4 py-6">
      <h1 className="text-2xl font-semibold text-navy mb-4">Search</h1>

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
          className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-navy text-sm focus:outline-none focus:ring-2 focus:ring-sage min-h-[44px]"
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
          <SearchIcon size={32} className="text-gray-200" strokeWidth={1.5} />
          <div>
            <p className="font-semibold text-navy text-base">No results for "{query.trim()}"</p>
            <p className="text-gray-400 text-sm mt-1">Try different keywords</p>
          </div>
        </div>
      )}

      {hasQuery && results.length > 0 && (
        <>
          <p className="text-xs text-gray-400 mb-4">
            {results.length} result{results.length === 1 ? '' : 's'}
          </p>
          <div className="flex flex-col gap-4">
            {results.map(item => (
              <ContentCard
                key={item.id}
                item={item}
                onClick={setSelectedItem}
              />
            ))}
          </div>
        </>
      )}

      {selectedItem && (
        <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  )
}
