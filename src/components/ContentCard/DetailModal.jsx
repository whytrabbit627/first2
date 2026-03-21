import { useEffect, useState } from 'react'
import { X, ExternalLink } from 'lucide-react'
import BookmarkButton from '../BookmarkButton/BookmarkButton'

const PLACEHOLDER_COLORS = {
  items: 'bg-sage',
  health: 'bg-terracotta/30',
  resources: 'bg-navy/20',
}

const AUDIENCE_LABELS = {
  mom: 'For Mom',
  partner: 'For Partner',
  both: 'For Both',
}

const STAGE_LABELS = {
  pregnancy: 'Pregnancy',
  birth: 'Birth',
  newborn: 'Newborn',
  'first-year': 'First Year',
}

export default function DetailModal({ item, onClose }) {
  const [visible, setVisible] = useState(false)

  // Animate in on mount
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [])

  // Animate out then call onClose
  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 280)
  }

  // Close on backdrop click
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) handleClose()
  }

  if (!item) return null

  const { id, title, category, subcategory, description, tags, audience, stage, link } = item
  const placeholderColor = PLACEHOLDER_COLORS[category] ?? 'bg-gray-100'

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-end transition-colors duration-300 ${
        visible ? 'bg-black/40' : 'bg-black/0'
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-t-3xl min-h-[75vh] max-h-[88vh] flex flex-col transition-transform duration-[280ms] ease-out ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1">
          {/* Image placeholder */}
          <div className={`${placeholderColor} h-40 w-full`} />

          {/* Content */}
          <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
            {/* Title row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <span className="inline-block bg-gray-100 text-gray-500 text-xs font-medium rounded-full px-2.5 py-0.5 mb-2 capitalize">
                  {subcategory.replace(/-/g, ' ')}
                </span>
                <h2 className="font-semibold text-navy text-lg leading-snug">{title}</h2>
              </div>
              <div className="flex items-center gap-1 shrink-0 -mt-1">
                <BookmarkButton itemId={id} />
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-300"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>

            {/* Tags */}
            {tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-cream text-gray-500 text-xs font-medium rounded-full px-3 py-1"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Audience + Stage pills */}
            <div className="flex flex-wrap gap-2">
              {audience?.map(a => (
                <span
                  key={a}
                  className="bg-sage/40 text-navy text-xs font-medium rounded-full px-3 py-1"
                >
                  {AUDIENCE_LABELS[a] ?? a}
                </span>
              ))}
              {stage?.map(s => (
                <span
                  key={s}
                  className="bg-terracotta/15 text-terracotta-dark text-xs font-medium rounded-full px-3 py-1"
                >
                  {STAGE_LABELS[s] ?? s}
                </span>
              ))}
            </div>

            {/* Visit resource button */}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-terracotta text-white rounded-xl px-6 py-3 font-medium text-sm min-h-[44px] mt-2 active:bg-terracotta-dark transition-colors"
              >
                Visit resource
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
