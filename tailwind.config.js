/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        unimed: {
          navy: '#0A1628',
          cyan: '#00D4FF',
          lightGray: '#F4F6F9',
          success: '#00C853',
          border: '#D1D5DB',
        }
      }
    },
  },
  plugins: [],
}
