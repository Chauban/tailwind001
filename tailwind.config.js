/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       'primary': '#E60023',
       'dark': '#111111',
       'light': '#EFEFEF',
       'lightHover': '#d7d7d7',
       'muted': '#717171'
      }
    },
  },
  plugins: [],
}

