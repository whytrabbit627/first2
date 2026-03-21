import { NavLink } from 'react-router-dom'
import { Home, Search, Bookmark } from 'lucide-react'

const tabs = [
  { to: '/home', label: 'Home', Icon: Home },
  { to: '/search', label: 'Search', Icon: Search },
  { to: '/bookmarks', label: 'Bookmarks', Icon: Bookmark },
]

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Scrollable page content — bottom padding clears the nav bar */}
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {/* Bottom navigation bar */}
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 flex z-50">
        {tabs.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center justify-center gap-1 min-h-[56px] text-xs font-medium transition-colors ${
                isActive ? 'text-terracotta' : 'text-gray-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
