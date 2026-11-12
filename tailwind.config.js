/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0b',
        coal: '#141416',
        smoke: '#1f1f23',
        bone: '#f2efe9',
        lime: { DEFAULT: '#c8ff3d', dark: '#a6dc1f' },
        flame: '#ff5b2e',
      },
      fontFamily: {
        display: ['"Anton"', 'Impact', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
