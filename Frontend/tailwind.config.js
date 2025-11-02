/** @type {import('tailwindcss').Config} */
export default {
  // Use class-based dark mode
  darkMode: 'class', 
  
  // Tell Tailwind where your class names are
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}