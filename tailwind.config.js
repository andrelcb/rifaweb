module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "rifaweb-primario": "#1759ff"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}