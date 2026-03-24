import BookmarkButton from '../BookmarkButton/BookmarkButton'
import { PLACEHOLDER_COLORS } from '../../utils/constants'

export default function ContentCard({ item, onClick, highlights = {} }) {
  const { id, title, category, subcategory, description, imageUrl } = item
  const placeholderColor = PLACEHOLDER_COLORS[category] ?? 'bg-gray-100'

  return (
    <article
      onClick={() => onClick?.(item)}
      className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col cursor-pointer active:scale-[0.99] transition-transform"
    >
      {/* Image */}
      <div className={`${placeholderColor} h-32 w-full shrink-0`}>
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
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            {/* Subcategory pill */}
            <span className="inline-block bg-gray-100 text-gray-500 text-xs font-medium rounded-full px-2.5 py-0.5 mb-1.5 capitalize">
              {subcategory.replace(/-/g, ' ')}
            </span>
            <h3 className="font-semibold text-navy text-sm leading-snug line-clamp-2">
              {highlights.title ?? title}
            </h3>
          </div>
          <BookmarkButton itemId={id} className="-mt-1 -mr-2 shrink-0" />
        </div>

        <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
          {highlights.description ?? description}
        </p>
      </div>
    </article>
  )
}
