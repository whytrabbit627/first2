import { useState } from 'react'

const STORAGE_KEY = 'first2_profile'

function readProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeProfile(profile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
}

export default function useUserProfile() {
  const [profile, setProfile] = useState(() => readProfile())

  function saveProfile(updates) {
    const next = { ...profile, ...updates }
    writeProfile(next)
    setProfile(next)
  }

  function clearProfile() {
    localStorage.removeItem(STORAGE_KEY)
    setProfile(null)
  }

  return { profile, saveProfile, clearProfile }
}
