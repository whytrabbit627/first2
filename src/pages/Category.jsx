import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, FilterX, SlidersHorizontal } from 'lucide-react'
import allContent from '../data/content.json'
import ContentCard from '../components/ContentCard/ContentCard'
import DetailModal from '../components/ContentCard/DetailModal'

const CATEGORY_LABELS = {
  items: 'Items to Buy',
  health: 'Health',
  resources: 'Resources',
}

const STAGE_OPTIONS = [
  { value: 'all',        label: 'All' },
  { value: 'pregnancy',  label: 'Pregnancy' },
  { value: 'newborn',    label: 'Newborn' },
  { value: 'first-year', label: 'First Year' },
]

// Compute smart stage default from localStorage once on mount (S-008).
function getSmartStageDefault() {
  try {
    const raw = localStorage.getItem('first2_profile')
    if (!raw) return 'all'
    const profile = JSON.parse(raw)
    if (profile.journeyStage === 'expecting') return 'pregnancy'
    if (profile.journeyStage === 'baby-here') {
      const birth = new Date(profile.actualBirthDate)
      const daysSinceBirth = (Date.now() - birth.getTime()) / (1000 * 60 * 60 * 24)
      return daysSinceBirth < 28 ? 'newborn' : 'first-year'
    }
  } catch {
    // malformed localStorage — fall through to default
  }
  return 'all'
}

function StageSheet({ activeStage, onSelect, onClose }) {
  const [visible, setVisible] = useState(false)

  // Animate in one frame after mount
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [])

  function handleSelect(value) {
    onSelect(value)
    onClose()
  }

  function handleScrimClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-end transition-colors duration-300 ${
        visible ? 'bg-black/40' : 'bg-black/0'
      }`}
      onClick={handleScrimClick}
    >
      <div
        className={`bg-white rounded-t-3xl pb-[calc(64px+1.5rem)] transition-transform duration-[280ms] ease-out ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-4">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        <div className="px-4">
          <p className="text-sm font-semibold text-navy mb-3">Stage</p>
          <div className="flex flex-wrap gap-2">
            {STAGE_OPTIONS.map(({ value, label }) => {
              const isActive = activeStage === value
              return (
                <button
                  key={value}
                  onClick={() => handleSelect(value)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium min-h-[36px] transition-colors ${
                    isActive ? 'bg-terracotta text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Category() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [activeSubcategory, setActiveSubcategory] = useState('all')
  const [activeStage, setActiveStage] = useState(getSmartStageDefault)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const label = CATEGORY_LABELS[slug] ?? slug
  const categoryItems = allContent.filter(item => item.category === slug)

  // Derive unique subcategories from items in this category
  const subcategories = ['all', ...new Set(categoryItems.map(item => item.subcategory))]

  // AND subcategory + stage filters
  const filtered = categoryItems
    .filter(item => activeSubcategory === 'all' || item.subcategory === activeSubcategory)
    .filter(item => activeStage === 'all' || item.stage === activeStage)

  const stageFilterActive = activeStage !== 'all'

  function clearFilters() {
    setActiveSubcategory('all')
    setActiveStage(getSmartStageDefault())
  }

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
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <h1 className="text-xl font-semibold text-navy">{label}</h1>
            <span className="text-sm text-gray-400">{filtered.length} resources</span>
          </div>

          {/* Filter button */}
          <button
            onClick={() => setSheetOpen(true)}
            className="relative flex items-center gap-1.5 text-sm font-medium text-navy min-h-[44px] min-w-[44px] justify-end"
          >
            <SlidersHorizontal size={16} />
            <span>Filter</span>
            {stageFilterActive && (
              <span className="absolute top-2.5 right-0 w-2 h-2 rounded-full bg-terracotta" />
            )}
          </button>
        </div>
      </div>

      {/* Subcategory pill row */}
      <div className="overflow-x-auto scrollbar-none px-4 pb-3">
        <div className="flex gap-2 w-max">
          {subcategories.map(sub => {
            const isActive = activeSubcategory === sub
            return (
              <button
                key={sub}
                onClick={() => setActiveSubcategory(sub)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap min-h-[36px] transition-colors ${
                  isActive ? 'bg-terracotta text-white' : 'bg-gray-100 text-gray-600'
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
          <div className="flex flex-col items-center mt-16 gap-3 text-center">
            <FilterX size={32} className="text-gray-200" strokeWidth={1.5} />
            <div>
              <p className="font-semibold text-navy text-base">No matches for your filters</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting the stage filter or subcategory</p>
            </div>
            <button
              onClick={clearFilters}
              className="text-terracotta text-sm font-medium min-h-[44px]"
            >
              Clear filters
            </button>
          </div>
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

      {sheetOpen && (
        <StageSheet
          activeStage={activeStage}
          onSelect={setActiveStage}
          onClose={() => setSheetOpen(false)}
        />
      )}

      {selectedItem && (
        <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  )
}
