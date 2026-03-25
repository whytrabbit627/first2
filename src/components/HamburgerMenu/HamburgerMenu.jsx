import { useState, useEffect } from 'react'
import { X, RefreshCw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

export default function HamburgerMenu({ isOpen, onClose }) {
  const [visible, setVisible] = useState(false)
  const { clearProfile } = useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isOpen) return
    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [isOpen])

  if (!isOpen) return null

  function handleScrimClick(e) {
    if (e.target === e.currentTarget) handleClose()
  }

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 280)
  }

  function handleUpdateJourney() {
    clearProfile()
    navigate('/')
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-end transition-colors duration-300 ${
        visible ? 'bg-black/40' : 'bg-black/0'
      }`}
      onClick={handleScrimClick}
    >
      <div
        className={`bg-surface-container-lowest rounded-t-3xl shadow-ambient transition-transform duration-[280ms] ease-out pb-[calc(64px+1.5rem)] ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <p className="font-semibold text-on-background text-base">Menu</p>
          <button
            onClick={handleClose}
            aria-label="Close menu"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* Actions */}
        <div className="px-4 pt-1">
          <button
            onClick={handleUpdateJourney}
            className="flex items-center gap-3 w-full min-h-[52px] text-left text-on-background text-sm font-medium"
          >
            <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center shrink-0">
              <RefreshCw size={16} className="text-primary" />
            </div>
            Update my journey
          </button>

          {/* TODO V2: Profile, Notifications, Preferences, About */}
        </div>
      </div>
    </div>
  )
}
