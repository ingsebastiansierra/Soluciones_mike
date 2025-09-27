/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1193d4',
        secondary: '#86868b',
        accent: '#1193d4',
        'background-light': '#f6f7f8',
        'background-dark': '#101c22',
        'foreground-light': '#0d171b',
        'foreground-dark': '#e7eff3',
        'card-light': '#ffffff',
        'card-dark': '#18262e',
        'subtle-light': '#e7eff3',
        'subtle-dark': '#20343f',
        'border-light': '#cfdfe7',
        'border-dark': '#2a4250',
        'light-bg': '#f6f7f8',
        'dark-bg': '#101c22',
        'text-primary': '#0d171b',
        'text-secondary': '#86868b',
        'text-light': '#e7eff3',
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
        display: ['Work Sans', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}