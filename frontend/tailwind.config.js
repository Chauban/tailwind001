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
      },
      backdropBlur: {
        'none': '0',//键值随便起
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
      }
    },
  },
  plugins: [],
}

