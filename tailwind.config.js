/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: { DEFAULT: '#B5C9B0', dark: '#8FAF89' },
        terracotta: { DEFAULT: '#C47B5A', dark: '#A8613F' },
        navy: '#1B2D5B',
        cream: '#FAF8F4',
      },
    },
  },
  plugins: [],
}