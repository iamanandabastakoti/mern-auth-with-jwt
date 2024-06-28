/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
        Prompt: ["Prompt", "sans-serif"],
      },
      colors: {
        primaryBg: "#011627",
        primaryText: "#FFFFFF",
        mainColor: "#48cae4",
      },
    },
  },
  plugins: [],
};
