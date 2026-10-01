/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0f172a',
        burgundy: '#4c1d95',
        champagne: '#fef3c7',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
        handwriting: ['Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [],
}
