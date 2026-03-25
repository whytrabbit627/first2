import { useEffect, useState } from 'react'
import { X, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BookmarkButton from '../BookmarkButton/BookmarkButton'
import { PLACEHOLDER_COLORS } from '../../utils/constants'

const AUDIENCE_LABELS = {
  mom: 'For Mom',
  partner: 'For Partner',
  both: 'For Both',
}

const STAGE_LABELS = {
  pregnancy: 'Pregnancy',
  newborn: 'Newborn',
  'first-year': 'First Year',
  all: 'All Stages',
}

export default function DetailModal({ item, onClose }) {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

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

  const { id, slug, title, category, subcategory, description, tags, audience, stage, affiliateUrl, affiliateLabel, imageUrl } = item
  const postSlug = slug ?? id
  const placeholderColor = PLACEHOLDER_COLORS[category] ?? 'bg-gray-100'

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-end transition-colors duration-300 ${
        visible ? 'bg-black/40' : 'bg-black/0'
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-surface-container-lowest rounded-t-3xl min-h-[75vh] max-h-[88vh] flex flex-col transition-transform duration-[280ms] ease-out ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 min-h-0">
          {/* Image */}
          <div className={`${placeholderColor} h-40 w-full`}>
            {imageUrl && (
              <img
                src={imageUrl}
                alt={title}
                loading="lazy"
                className="h-full w-full object-cover"
                onError={e => { e.currentTarget.style.display = 'none' }}
              />
            )}
          </div>

          {/* Content */}
          <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
            {/* Title row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <span className="inline-block bg-gray-100 text-gray-500 text-xs font-medium rounded-full px-2.5 py-0.5 mb-2 capitalize">
                  {subcategory.replace(/-/g, ' ')}
                </span>
                <h2 className="font-semibold text-on-background text-lg leading-snug">{title}</h2>
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
              {audience && (
                <span className="bg-sage/40 text-navy text-xs font-medium rounded-full px-3 py-1">
                  {AUDIENCE_LABELS[audience] ?? audience}
                </span>
              )}
              {stage && (
                <span className="bg-terracotta/15 text-terracotta-dark text-xs font-medium rounded-full px-3 py-1">
                  {STAGE_LABELS[stage] ?? stage}
                </span>
              )}
            </div>

          </div>
        </div>

        {/* Sticky footer */}
        <div className="shrink-0 px-4 pt-3 pb-[calc(64px+1.5rem)] flex flex-col gap-3">
          {/* Affiliate CTA — hidden when affiliateUrl is empty */}
          {affiliateUrl && (
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center justify-center gap-2 bg-primary text-white rounded-full px-6 py-3 font-medium text-sm min-h-[44px] active:bg-primary-container transition-colors"
            >
              {affiliateLabel || 'Learn More'}
              <ExternalLink size={15} />
            </a>
          )}
          {/* Read full guide */}
          <button
            onClick={() => { handleClose(); navigate(`/posts/${postSlug}`) }}
            className="text-primary text-sm font-medium min-h-[44px] text-center"
          >
            Read the full guide →
          </button>
        </div>
      </div>
    </div>
  )
}
