/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          deep: '#0f172a',
          ocean: '#1e3a8a',
          mint: '#10b981',
          mist: '#f0fdf4',
          sun: '#f59e0b',
        },
        dark: {
          bg: '#121212',
          surface: '#1e1e1e',
          text: '#e0e0e0',
          border: '#333333'
        }
      },
      boxShadow: {
        glow: '0 20px 50px rgba(30,58,138,0.3)',
      },
      animation: {
        floaty: 'floaty 4s ease-in-out infinite',
        fadein: 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
    },
  },
  plugins: [],
};
