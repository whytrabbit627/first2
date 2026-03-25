import logoIcon from '/icon-1024.png'

export default function Logo({ size = 'sm' }) {
  // sm — icon only, 24px (sub-page brand mark)
  if (size === 'sm') {
    return <img src={logoIcon} alt="First2" className="h-6 w-auto" />
  }

  // md — icon + wordmark + tagline inline (Home header)
  if (size === 'md') {
    return (
      <div className="flex items-center gap-2">
        <img src={logoIcon} alt="First2" className="h-7 w-auto shrink-0" />
        <span className="font-semibold text-navy">First2</span>
        <span className="text-gray-400 text-xs">Your Curated Parenting Journey</span>
      </div>
    )
  }

  // lg — icon + wordmark + tagline stacked, centered (Onboarding splash)
  return (
    <div className="flex flex-col items-center gap-1">
      <img src={logoIcon} alt="First2" className="h-20 w-auto rounded-2xl" />
      <span className="text-2xl font-semibold text-navy">First2</span>
      <span className="text-sm text-gray-400">Your Curated Parenting Journey</span>
    </div>
  )
}
