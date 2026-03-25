import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag, Heart, BookOpen, Menu } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import allContent from '../data/content.json'
import HamburgerMenu from '../components/HamburgerMenu/HamburgerMenu'

const CATEGORIES = [
  {
    slug: 'items',
    label: 'Items to Buy',
    description: 'Gear, products, and essentials curated for every stage.',
    Icon: ShoppingBag,
    iconBg: 'bg-secondary',
    iconColor: 'text-white',
  },
  {
    slug: 'health',
    label: 'Health',
    description: 'Nutrition, fitness, supplements, and mental wellbeing.',
    Icon: Heart,
    iconBg: 'bg-primary',
    iconColor: 'text-white',
  },
  {
    slug: 'resources',
    label: 'Resources',
    description: 'Guides, checklists, and expert advice for the full journey.',
    Icon: BookOpen,
    iconBg: 'bg-on-background',
    iconColor: 'text-white',
  },
]

function categoryCount(slug) {
  return allContent.filter(item => item.category === slug).length
}

export default function Home() {
  const { profile } = useAppContext()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="px-4 py-6 bg-surface-container-low min-h-full">
      {/* Header */}
      <div className="relative flex items-center justify-center mb-6 min-h-[44px]">
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="absolute left-0 min-h-[44px] min-w-[44px] flex items-center justify-center text-on-background"
        >
          <Menu size={22} />
        </button>
        <span className="font-semibold text-on-background text-base">First2</span>
      </div>

      {/* Category cards */}
      <div className="flex flex-col gap-4">
        {CATEGORIES.map(({ slug, label, description, Icon, iconBg, iconColor }) => (
          <button
            key={slug}
            onClick={() => navigate(`/category/${slug}`)}
            className="bg-surface-container-lowest rounded-3xl shadow-ambient p-5 flex items-center gap-4 text-left min-h-[88px] active:scale-[0.99] transition-transform w-full"
          >
            <div className={`${iconBg} w-12 h-12 rounded-full flex items-center justify-center shrink-0`}>
              <Icon className={iconColor} size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-on-background text-base">{label}</p>
              <p className="text-gray-400 text-xs mt-0.5 leading-snug">{description}</p>
            </div>
            <span className="text-gray-300 text-xs font-medium shrink-0">
              {categoryCount(slug)}
            </span>
          </button>
        ))}
      </div>

      <HamburgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  )
}
