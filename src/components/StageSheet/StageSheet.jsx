import { useState, useEffect } from 'react'

const STAGE_OPTIONS = [
  { value: 'all',        label: 'All' },
  { value: 'pregnancy',  label: 'Pregnancy' },
  { value: 'newborn',    label: 'Newborn' },
  { value: 'first-year', label: 'First Year' },
]

export default function StageSheet({ isOpen, onClose, activeStage, onSelect }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [isOpen])

  if (!isOpen) return null

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
