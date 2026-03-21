import { useState } from 'react'
import { Bookmark } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import allContent from '../data/content.json'
import ContentCard from '../components/ContentCard/ContentCard'
import DetailModal from '../components/ContentCard/DetailModal'

const GROUPS = [
  { slug: 'items', label: 'Items to Buy' },
  { slug: 'health', label: 'Health' },
  { slug: 'resources', label: 'Resources' },
]

export default function Bookmarks() {
  const { bookmarkIds } = useAppContext()
  const [selectedItem, setSelectedItem] = useState(null)

  const savedItems = allContent.filter(item => bookmarkIds.includes(item.id))
  const hasBookmarks = savedItems.length > 0

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-semibold text-navy mb-1">Saved</h1>
      <p className="text-sm text-gray-400 mb-6">
        {hasBookmarks ? `${savedItems.length} saved resource${savedItems.length === 1 ? '' : 's'}` : 'Nothing saved yet'}
      </p>

      {!hasBookmarks ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center mt-20 gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <Bookmark size={28} className="text-gray-300" strokeWidth={1.5} />
          </div>
          <div>
            <p className="font-semibold text-navy text-base">Nothing saved yet</p>
            <p className="text-gray-400 text-sm mt-1 leading-snug">
              Tap the bookmark icon on any resource<br />to save it here.
            </p>
          </div>
        </div>
      ) : (
        /* Grouped by category */
        <div className="flex flex-col gap-8">
          {GROUPS.map(({ slug, label }) => {
            const groupItems = savedItems.filter(item => item.category === slug)
            if (groupItems.length === 0) return null
            return (
              <section key={slug}>
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  {label}
                </h2>
                <div className="flex flex-col gap-4">
                  {groupItems.map(item => (
                    <ContentCard
                      key={item.id}
                      item={item}
                      onClick={setSelectedItem}
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}

      {selectedItem && (
        <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  )
}
