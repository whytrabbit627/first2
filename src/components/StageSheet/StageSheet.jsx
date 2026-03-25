import { useState, useEffect } from 'react'

const STAGE_OPTIONS = [
  { value: 'all',        label: 'All' },
  { value: 'pregnancy',  label: 'Pregnancy' },
  { value: 'newborn',    label: 'Newborn' },
  { value: 'first-year', label: 'First Year' },
]

const AUDIENCE_OPTIONS = [
  { value: 'all',     label: 'All' },
  { value: 'mom',     label: 'For Mom' },
  { value: 'partner', label: 'For Partners' },
  { value: 'both',    label: 'For Both' },
]

export default function StageSheet({
  isOpen,
  onClose,
  activeStage,
  onSelect,
  activeAudience,
  onAudienceSelect,
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [isOpen])

  if (!isOpen) return null

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
        className={`bg-surface-container-lowest rounded-t-3xl pb-[calc(64px+1.5rem)] transition-transform duration-[280ms] ease-out ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-4">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        <div className="px-4 flex flex-col gap-6">
          {/* Stage */}
          <div>
            <p className="text-sm font-semibold text-on-background mb-3">Stage</p>
            <div className="flex flex-wrap gap-2">
              {STAGE_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => onSelect(value)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium min-h-[36px] transition-colors ${
                    activeStage === value ? 'bg-primary text-white' : 'bg-surface-container text-gray-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Audience */}
          <div>
            <p className="text-sm font-semibold text-on-background mb-3">Audience</p>
            <div className="flex flex-wrap gap-2">
              {AUDIENCE_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => onAudienceSelect(value)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium min-h-[36px] transition-colors ${
                    activeAudience === value ? 'bg-primary text-white' : 'bg-surface-container text-gray-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Done button */}
          <button
            onClick={onClose}
            className="w-full bg-primary text-white rounded-full py-3 font-medium text-sm min-h-[44px] transition-colors active:bg-primary-container"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
