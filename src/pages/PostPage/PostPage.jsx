import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ExternalLink } from 'lucide-react'
import BookmarkButton from '../../components/BookmarkButton/BookmarkButton'

const STAGE_LABELS = {
  pregnancy: 'Pregnancy',
  newborn: 'Newborn',
  'first-year': 'First Year',
  all: 'All Stages',
}

const AUDIENCE_LABELS = {
  mom: 'For Mom',
  partner: 'For Partner',
  both: 'For Both',
}

export default function PostPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`/posts/${slug}.json`)
      .then(r => {
        if (!r.ok) throw new Error('not found')
        return r.json()
      })
      .then(data => setPost(data))
      .catch(() => setNotFound(true))
  }, [slug])

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full px-4 py-16 text-center">
        <p className="font-semibold text-on-background text-lg mb-2">Post not found</p>
        <p className="text-gray-400 text-sm mb-6">This article doesn't exist or may have moved.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-primary text-sm font-medium min-h-[44px]"
        >
          Go back
        </button>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <div className="w-8 h-8 rounded-full bg-primary/20 animate-pulse" />
      </div>
    )
  }

  const { title, category, subcategory, stage, audience, imageUrl, readingTime, publishedAt, tags, affiliateUrl, affiliateLabel, body } = post
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="min-h-full bg-surface-container-low">
      {/* Back button */}
      <div className="px-4 pt-6 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-gray-400 text-sm min-h-[44px] -ml-1"
        >
          <ChevronLeft size={18} />
          Back
        </button>
      </div>

      {/* Hero image */}
      {imageUrl && (
        <div className="w-full h-52 bg-gray-100 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        </div>
      )}

      {/* Article content */}
      <div className="md:max-w-2xl md:mx-auto px-4 pt-5 pb-[calc(64px+2rem)]">
        {/* Category + subcategory pills */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-surface-container text-gray-500 text-xs font-medium rounded-full px-3 py-1 capitalize">
            {subcategory}
          </span>
          {stage && (
            <span className="bg-terracotta/15 text-terracotta-dark text-xs font-medium rounded-full px-3 py-1">
              {STAGE_LABELS[stage] ?? stage}
            </span>
          )}
          {audience && (
            <span className="bg-sage/40 text-navy text-xs font-medium rounded-full px-3 py-1">
              {AUDIENCE_LABELS[audience] ?? audience}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-serif text-2xl font-semibold text-on-background leading-snug mb-2">
          {title}
        </h1>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-5">
          <span>{readingTime}</span>
          <span>·</span>
          <span>{formattedDate}</span>
          <div className="ml-auto">
            <BookmarkButton itemId={slug} />
          </div>
        </div>

        {/* Rendered markdown body */}
        <div
          className="post-body text-gray-700"
          dangerouslySetInnerHTML={{ __html: body }}
        />

        {/* Tags */}
        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8">
            {tags.map(tag => (
              <span key={tag} className="bg-cream text-gray-500 text-xs font-medium rounded-full px-3 py-1">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Affiliate CTA — only shown when affiliateUrl is present */}
        {affiliateUrl && (
          <div className="mt-8">
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center justify-center gap-2 bg-primary text-white rounded-full px-6 py-3 font-medium text-sm min-h-[44px] active:bg-primary-container transition-colors"
            >
              {affiliateLabel || 'Shop now'}
              <ExternalLink size={15} />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
