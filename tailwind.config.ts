import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/composables/**/*.{js,ts}',
    './app/app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A1628',
          50: '#1E293B',
          100: '#172033',
          200: '#13192B',
          300: '#0F1423',
          400: '#0C101C',
          500: '#0A1628',
          600: '#080F1E',
          700: '#060B16',
          800: '#04070E',
          900: '#020406',
        },
        accent: {
          DEFAULT: '#4ADE80',
          50: '#E8FBF0',
          100: '#D0F7E0',
          200: '#A1EFC1',
          300: '#72E7A2',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#1AA34E',
          700: '#13813E',
          800: '#0C5F2E',
          900: '#053D1E',
        },
        gold: {
          DEFAULT: '#D4A843',
          50: '#FBF5E8',
          100: '#F7EBD1',
          200: '#EFD7A3',
          300: '#E7C375',
          400: '#D4A843',
          500: '#B8912A',
          600: '#967620',
          700: '#745B19',
          800: '#524010',
          900: '#302508',
        },
        dark: {
          DEFAULT: '#0A1628',
          secondary: '#1E293B',
          tertiary: '#334155',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
