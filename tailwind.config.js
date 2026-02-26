/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nexus-bg': '#0a0a0f',
        'nexus-cyan': '#00d4ff',
        'nexus-blue': '#0066ff',
      },
    },
  },
  plugins: [],
}
