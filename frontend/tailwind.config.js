/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        backg:"#B3C8CF",
        primary:'#F1F0E8',
        secondry:'#89A8B2'

      }
    },
  },
  plugins: [],
}