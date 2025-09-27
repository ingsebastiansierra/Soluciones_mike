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
        primary: '#000000',
        secondary: '#ffffff',
        accent: '#000000',
        'background-light': '#ffffff',
        'background-dark': '#000000',
        'foreground-light': '#000000',
        'foreground-dark': '#ffffff',
        'card-light': '#ffffff',
        'card-dark': '#000000',
        'subtle-light': '#f0f0f0',
        'subtle-dark': '#1a1a1a',
        'border-light': '#e0e0e0',
        'border-dark': '#333333',
        'light-bg': '#ffffff',
        'dark-bg': '#000000',
        'text-primary': '#000000',
        'text-secondary': '#666666',
        'text-light': '#ffffff',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
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