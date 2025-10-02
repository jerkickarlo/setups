export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { 
        sans: ["ui-sans-serif","system-ui","-apple-system","Segoe UI","Roboto","Inter","Ubuntu","Cantarell","Noto Sans","Helvetica Neue","Arial","sans-serif"]
      },
      boxShadow: {'glow': '0 0 40px rgba(255,255,255,0.08)'},
    },
  },
  plugins: [],
}
