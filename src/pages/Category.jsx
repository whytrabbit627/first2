import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import allContent from '../data/content.json'
import ContentCard from '../components/ContentCard/ContentCard'
import DetailModal from '../components/ContentCard/DetailModal'

const CATEGORY_LABELS = {
  items: 'Items to Buy',
  health: 'Health',
  resources: 'Resources',
}

export default function Category() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [activeSubcategory, setActiveSubcategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)

  const label = CATEGORY_LABELS[slug] ?? slug
  const categoryItems = allContent.filter(item => item.category === slug)

  // Derive unique subcategories from the items in this category
  const subcategories = ['all', ...new Set(categoryItems.map(item => item.subcategory))]

  const filtered = activeSubcategory === 'all'
    ? categoryItems
    : categoryItems.filter(item => item.subcategory === activeSubcategory)

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="px-4 pt-6 pb-3">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-1 text-gray-400 text-sm min-h-[44px] -ml-1 mb-2"
        >
          <ChevronLeft size={18} />
          Home
        </button>
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl font-semibold text-navy">{label}</h1>
          <span className="text-sm text-gray-400">{filtered.length} resources</span>
        </div>
      </div>

      {/* Subcategory pill filters — horizontally scrollable */}
      <div className="overflow-x-auto scrollbar-none px-4 pb-3">
        <div className="flex gap-2 w-max">
          {subcategories.map(sub => {
            const isActive = activeSubcategory === sub
            return (
              <button
                key={sub}
                onClick={() => setActiveSubcategory(sub)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap min-h-[36px] transition-colors ${
                  isActive
                    ? 'bg-terracotta text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {sub === 'all' ? 'All' : sub.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content list */}
      <div className="flex flex-col gap-4 px-4 pt-1 pb-4">
        {filtered.length === 0 ? (
          <p className="text-gray-400 text-sm text-center mt-8">No resources in this category yet.</p>
        ) : (
          filtered.map(item => (
            <ContentCard
              key={item.id}
              item={item}
              onClick={setSelectedItem}
            />
          ))
        )}
      </div>

      {selectedItem && (
        <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  )
}
