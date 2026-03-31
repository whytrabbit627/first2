import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, FilterX, SlidersHorizontal } from 'lucide-react'
import ContentCard from '../components/ContentCard/ContentCard'
import DetailModal from '../components/ContentCard/DetailModal'
import StageSheet from '../components/StageSheet/StageSheet'
import { useAppContext } from '../context/AppContext'

const CATEGORY_LABELS = {
  items: 'Items to Buy',
  health: 'Health',
  resources: 'Resources',
}

const MS_PER_DAY = 1000 * 60 * 60 * 24
const MS_PER_WEEK = MS_PER_DAY * 7

// Returns the set of stages to show automatically based on profile + proximity.
// Manual filter overrides this; 'smart' means "use this computed set".
function computeSmartStages(profile) {
  if (!profile) return null // no profile → show all
  if (profile.journeyStage === 'expecting' && profile.expectedDueDate) {
    const weeksUntilDue = (new Date(profile.expectedDueDate) - Date.now()) / MS_PER_WEEK
    return weeksUntilDue <= 20 ? ['pregnancy', 'newborn'] : ['pregnancy']
  }
  if (profile.journeyStage === 'baby-here' && profile.actualBirthDate) {
    const daysSinceBirth = (Date.now() - new Date(profile.actualBirthDate)) / MS_PER_DAY
    if (daysSinceBirth < 28) return ['newborn']
    if (daysSinceBirth < 90) return ['newborn', 'first-year']
    return ['first-year']
  }
  return null // fallback → show all
}

export default function Category() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { profile, allContent } = useAppContext()
  const [activeSubcategory, setActiveSubcategory] = useState('all')
  // 'smart' = auto-expanded set from profile; 'all' or a specific stage = manual override
  const [activeStage, setActiveStage] = useState('smart')
  const [activeAudience, setActiveAudience] = useState('all')
  const smartStages = computeSmartStages(profile)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const label = CATEGORY_LABELS[slug] ?? slug
  const categoryItems = allContent.filter(item => item.category === slug)

  // Derive unique subcategories from items in this category
  const subcategories = ['all', ...new Set(categoryItems.map(item => item.subcategory))]

  // AND subcategory + stage + audience filters
  const filtered = categoryItems
    .filter(item => activeSubcategory === 'all' || item.subcategory === activeSubcategory)
    .filter(item => {
      if (activeStage === 'all') return true
      if (activeStage === 'smart') return smartStages ? smartStages.includes(item.stage) : true
      return item.stage === activeStage
    })
    .filter(item => activeAudience === 'all' || item.audience === activeAudience)

  // Dot only appears when the user has manually overridden stage or audience
  const filterActive = activeStage !== 'smart' || activeAudience !== 'all'

  function clearFilters() {
    setActiveSubcategory('all')
    setActiveStage('smart')
    setActiveAudience('all')
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
            <h1 className="text-xl font-semibold text-on-background">{label}</h1>
            <span className="text-sm text-gray-400">{filtered.length} resources</span>
          </div>

          {/* Filter button */}
          <button
            onClick={() => setSheetOpen(true)}
            className="flex items-center gap-1.5 text-sm font-medium text-on-background min-h-[44px] min-w-[44px] justify-end"
          >
            <span className="relative">
              <SlidersHorizontal size={16} />
              {filterActive && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary" />
              )}
            </span>
            <span>Filter</span>
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
                  isActive ? 'bg-primary text-white' : 'bg-surface-container text-gray-600'
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
              <p className="font-semibold text-on-background text-base">No matches for your filters</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting the stage filter or subcategory</p>
            </div>
            <button
              onClick={clearFilters}
              className="text-primary text-sm font-medium min-h-[44px]"
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

      <StageSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        activeStage={activeStage}
        onSelect={setActiveStage}
        activeAudience={activeAudience}
        onAudienceSelect={setActiveAudience}
      />

      {selectedItem && (
        <DetailModal key={selectedItem.id} item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  )
}
