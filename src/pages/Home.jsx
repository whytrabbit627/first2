import { useNavigate } from 'react-router-dom'
import { ShoppingBag, Heart, BookOpen } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import allContent from '../data/content.json'

const CATEGORIES = [
  {
    slug: 'items',
    label: 'Items to Buy',
    description: 'Gear, products, and essentials curated for every stage.',
    Icon: ShoppingBag,
    iconBg: 'bg-sage',
    iconColor: 'text-white',
    accent: 'border-sage',
  },
  {
    slug: 'health',
    label: 'Health',
    description: 'Nutrition, fitness, supplements, and mental wellbeing.',
    Icon: Heart,
    iconBg: 'bg-terracotta',
    iconColor: 'text-white',
    accent: 'border-terracotta',
  },
  {
    slug: 'resources',
    label: 'Resources',
    description: 'Guides, checklists, and expert advice for the full journey.',
    Icon: BookOpen,
    iconBg: 'bg-navy',
    iconColor: 'text-white',
    accent: 'border-navy',
  },
]

function categoryCount(slug) {
  return allContent.filter(item => item.category === slug).length
}

export default function Home() {
  const { profile } = useAppContext()
  const navigate = useNavigate()

  const greeting = profile?.journeyStage === 'expecting'
    ? 'Your pregnancy journey starts here.'
    : 'Everything you need for your new arrival.'

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-navy">First2</h1>
        <p className="text-gray-400 text-sm mt-1">{greeting}</p>
      </div>

      {/* Category cards */}
      <div className="flex flex-col gap-4">
        {CATEGORIES.map(({ slug, label, description, Icon, iconBg, iconColor, accent }) => (
          <button
            key={slug}
            onClick={() => navigate(`/category/${slug}`)}
            className={`bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4 text-left min-h-[88px] border-l-4 ${accent} active:scale-[0.99] transition-transform w-full`}
          >
            <div className={`${iconBg} w-12 h-12 rounded-full flex items-center justify-center shrink-0`}>
              <Icon className={iconColor} size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-navy text-base">{label}</p>
              <p className="text-gray-400 text-xs mt-0.5 leading-snug">{description}</p>
            </div>
            <span className="text-gray-300 text-xs font-medium shrink-0">
              {categoryCount(slug)}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
