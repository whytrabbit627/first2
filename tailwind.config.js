/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        ambient: '0 4px 24px rgba(28, 28, 23, 0.12)',
      },
      colors: {
        // Legacy tokens (keep until S-032 migration)
        sage: { DEFAULT: '#B5C9B0', dark: '#8FAF89' },
        terracotta: { DEFAULT: '#C47B5A', dark: '#A8613F' },
        navy: '#1B2D5B',
        cream: '#FAF8F4',
        // Stitch design system tokens (flat keys to avoid JIT prefix ambiguity)
        surface: '#fcf9f0',
        'surface-container': '#f1eee5',
        'surface-container-low': '#f6f3ea',
        'surface-container-lowest': '#ffffff',
        primary: {
          DEFAULT: '#9b3f2b',
          container: '#bb5640',
        },
        secondary: '#53643a',
        'on-background': '#1c1c17',
      },
    },
  },
  plugins: [],
}