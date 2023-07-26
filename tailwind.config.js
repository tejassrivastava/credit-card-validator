/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'Red': 'hsl(0, 100%, 66%)',

        'White': 'hsl(0, 0%, 100%)',
        'Lighgrayishviolet': 'hsl(270, 3%, 87%)',
        'Dargrayisviolet': 'hsl(279, 6%, 55%)',
        'Verdarviolet': 'hsl(278, 68%, 11%)',
      },
    },
  },
  plugins: [],
}