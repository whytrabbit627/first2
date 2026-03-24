import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import Picker from 'react-mobile-picker'
import { useAppContext } from '../context/AppContext'
import Logo from '../components/Logo/Logo'
import pregnantBelly from '../assets/pregnant-belly.png'
import babyCrib from '../assets/baby-crib.png'

// Step 1 — journey stage selection (S-001)
// Step 2 — date entry with scroll picker (S-002, redesigned S-034)

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate()
}

function buildDateString(month, day, year) {
  const m = String(month + 1).padStart(2, '0')
  const d = String(day).padStart(2, '0')
  return `${year}-${m}-${d}`
}

export default function Onboarding() {
  const { saveProfile } = useAppContext()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [journeyStage, setJourneyStage] = useState(null) // 'expecting' | 'baby-here'

  // Initialize picker to current date
  const now = new Date()
  const [pickerValue, setPickerValue] = useState({
    month: MONTHS[now.getMonth()],
    day: String(now.getDate()),
    year: String(now.getFullYear()),
  })

  const monthIndex = MONTHS.indexOf(pickerValue.month)
  const yearNum = Number(pickerValue.year)

  // Generate day options based on selected month/year
  const dayCount = useMemo(() => daysInMonth(monthIndex, yearNum), [monthIndex, yearNum])
  const days = useMemo(() => Array.from({ length: dayCount }, (_, i) => String(i + 1)), [dayCount])

  // Clamp day if month/year change reduces available days
  function handlePickerChange(newValue, key) {
    if (key === 'month' || key === 'year') {
      const newMonthIndex = MONTHS.indexOf(newValue.month)
      const newYear = Number(newValue.year)
      const maxDay = daysInMonth(newMonthIndex, newYear)
      if (Number(newValue.day) > maxDay) {
        newValue.day = String(maxDay)
      }
    }
    setPickerValue(newValue)
  }

  function handleStageSelect(stage) {
    setJourneyStage(stage)
    setStep(2)
  }

  function handleDateSubmit() {
    const dateStr = buildDateString(monthIndex, Number(pickerValue.day), yearNum)

    const profileUpdate = { journeyStage }
    if (journeyStage === 'expecting') {
      profileUpdate.expectedDueDate = dateStr
      profileUpdate.actualBirthDate = null
    } else {
      profileUpdate.actualBirthDate = dateStr
      profileUpdate.expectedDueDate = null
    }

    saveProfile(profileUpdate)
    navigate('/home')
  }

  const isExpecting = journeyStage === 'expecting'
  const dateLabel = isExpecting ? 'When is your baby due?' : 'When was your baby born?'

  // Year range: 2 years back to 2 years forward
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear()
    const result = []
    for (let y = currentYear - 2; y <= currentYear + 2; y++) {
      result.push(String(y))
    }
    return result
  }, [])

  return (
    <div className="min-h-screen bg-surface flex flex-col px-4 py-10">
      {/* Header */}
      <div className="flex flex-col items-center mb-10">
        <Logo size="lg" />
      </div>

      {step === 1 && (
        <div className="flex flex-col flex-1">
          <h2 className="text-2xl font-semibold text-on-background text-center mb-2">
            Where are you in your journey?
          </h2>
          <p className="text-gray-400 text-center text-sm mb-8">
            This helps us show you the most relevant resources.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleStageSelect('expecting')}
              className="flex flex-col items-center rounded-3xl shadow-ambient text-center active:scale-[0.97] transition-transform overflow-hidden bg-gradient-to-b from-primary-container/30 to-primary/20"
            >
              <div className="w-full aspect-square flex items-center justify-center p-4">
                <img src={pregnantBelly} alt="" className="w-full h-full object-contain" />
              </div>
              <div className="pb-5 px-3">
                <p className="font-semibold text-on-background text-sm">I'm expecting</p>
              </div>
            </button>

            <button
              onClick={() => handleStageSelect('baby-here')}
              className="flex flex-col items-center rounded-3xl shadow-ambient text-center active:scale-[0.97] transition-transform overflow-hidden bg-gradient-to-b from-secondary/20 to-secondary/10"
            >
              <div className="w-full aspect-square flex items-center justify-center p-4">
                <img src={babyCrib} alt="" className="w-full h-full object-contain" />
              </div>
              <div className="pb-5 px-3">
                <p className="font-semibold text-on-background text-sm">My baby is here</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col flex-1">
          <button
            onClick={() => setStep(1)}
            className="text-sm text-gray-400 mb-6 self-start min-h-[44px] flex items-center gap-1"
          >
            <ChevronLeft size={16} />
            Back
          </button>

          <h2 className="text-2xl font-semibold text-on-background text-center mb-2">{dateLabel}</h2>
          <p className="text-sm text-gray-400 text-center mb-8">
            We'll use this to surface content that's relevant right now.
          </p>

          {/* Scroll picker */}
          <div className="bg-surface-container-lowest rounded-3xl shadow-ambient overflow-hidden mx-auto w-full max-w-sm">
            <Picker
              className="picker-stitch"
              value={pickerValue}
              onChange={handlePickerChange}
              height={216}
              itemHeight={36}
              wheelMode="natural"
            >
              <Picker.Column name="month">
                {MONTHS.map(month => (
                  <Picker.Item key={month} value={month}>
                    {({ selected }) => (
                      <span className={`text-sm transition-colors ${selected ? 'font-semibold text-on-background' : 'text-gray-400'}`}>
                        {month}
                      </span>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>

              <Picker.Column name="day">
                {days.map(day => (
                  <Picker.Item key={day} value={day}>
                    {({ selected }) => (
                      <span className={`text-sm transition-colors ${selected ? 'font-semibold text-on-background' : 'text-gray-400'}`}>
                        {day}
                      </span>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>

              <Picker.Column name="year">
                {years.map(year => (
                  <Picker.Item key={year} value={year}>
                    {({ selected }) => (
                      <span className={`text-sm transition-colors ${selected ? 'font-semibold text-on-background' : 'text-gray-400'}`}>
                        {year}
                      </span>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>
            </Picker>
          </div>

          <div className="mt-6">
            <button
              onClick={handleDateSubmit}
              className="w-full bg-primary text-white rounded-full px-6 py-3 font-medium text-base min-h-[44px] active:bg-primary-container transition-colors"
            >
              Let's go
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
