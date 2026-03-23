import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Baby, Heart } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import Logo from '../components/Logo/Logo'

// Step 1 — journey stage selection (S-001)
// Step 2 — date entry (S-002)

export default function Onboarding() {
  const { saveProfile } = useAppContext()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [journeyStage, setJourneyStage] = useState(null) // 'expecting' | 'baby-here'
  const [date, setDate] = useState('')
  const [dateError, setDateError] = useState('')

  function handleStageSelect(stage) {
    setJourneyStage(stage)
    setStep(2)
  }

  function handleDateSubmit(e) {
    e.preventDefault()
    if (!date) {
      setDateError('Please enter a date to continue.')
      return
    }
    setDateError('')

    const profileUpdate = { journeyStage }
    if (journeyStage === 'expecting') {
      profileUpdate.expectedDueDate = date
      profileUpdate.actualBirthDate = null
    } else {
      profileUpdate.actualBirthDate = date
      profileUpdate.expectedDueDate = null
    }

    saveProfile(profileUpdate)
    navigate('/home')
  }

  const isExpecting = journeyStage === 'expecting'
  const dateLabel = isExpecting ? 'When is your baby due?' : 'When was your baby born?'
  const dateFieldName = isExpecting ? 'expectedDueDate' : 'actualBirthDate'

  return (
    <div className="min-h-screen bg-cream flex flex-col px-4 py-10">
      {/* Header */}
      <div className="flex flex-col items-center mb-10">
        <Logo size="lg" />
      </div>

      {step === 1 && (
        <div className="flex flex-col flex-1">
          <h2 className="text-xl font-semibold text-navy text-center mb-2">
            Where are you in your journey?
          </h2>
          <p className="text-gray-400 text-center text-sm mb-8">
            This helps us show you the most relevant resources.
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => handleStageSelect('expecting')}
              className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm text-left min-h-[80px] active:scale-[0.98] transition-transform"
            >
              <div className="w-12 h-12 rounded-full bg-sage flex items-center justify-center shrink-0">
                <Heart className="text-white" size={22} />
              </div>
              <div>
                <p className="font-semibold text-navy text-base">I'm expecting</p>
                <p className="text-sm text-gray-400 mt-0.5">Currently pregnant</p>
              </div>
            </button>

            <button
              onClick={() => handleStageSelect('baby-here')}
              className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm text-left min-h-[80px] active:scale-[0.98] transition-transform"
            >
              <div className="w-12 h-12 rounded-full bg-terracotta flex items-center justify-center shrink-0">
                <Baby className="text-white" size={22} />
              </div>
              <div>
                <p className="font-semibold text-navy text-base">My baby is here</p>
                <p className="text-sm text-gray-400 mt-0.5">Baby has arrived</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col flex-1">
          <button
            onClick={() => { setStep(1); setDate(''); setDateError('') }}
            className="text-sm text-gray-400 mb-6 self-start min-h-[44px] flex items-center"
          >
            ← Back
          </button>

          <h2 className="text-xl font-semibold text-navy mb-2">{dateLabel}</h2>
          <p className="text-sm text-gray-400 mb-8">
            We'll use this to surface content that's relevant right now.
          </p>

          <form onSubmit={handleDateSubmit} className="flex flex-col gap-4">
            <div>
              <input
                type="date"
                name={dateFieldName}
                value={date}
                onChange={e => { setDate(e.target.value); setDateError('') }}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-navy text-base focus:outline-none focus:ring-2 focus:ring-sage bg-white min-h-[44px]"
              />
              {dateError && (
                <p className="text-terracotta text-sm mt-2">{dateError}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-terracotta text-white rounded-xl px-6 py-3 font-medium text-base min-h-[44px] active:bg-terracotta-dark transition-colors mt-2"
            >
              Let's go
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
