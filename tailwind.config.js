const { fontFamily } = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "sans": ["var(--font-poppins)", ...fontFamily.sans],
      },
      animation: {
        "flip": "flip 1s ease-in-out both",
        "rise": "rise 1s ease-in-out both",
        "bg-blur": "bg-blur 1s ease-in-out both",
        // "to-transparent": "0.5s to-transparent 5s ease-in-out both",
      },
      boxShadow: {
        "neumorphism": "18px 18px 38px #b6b6b6, -18px -18px 38px #ffffff",
        "neumorphism-dark": "17px 17px 40px #151515, -17px -17px 40px #373737"
      },
      keyframes: {
        "flip": {
          "0%, 100%": { transform: "rotateY(0deg)" },
          "50%": { transform: "rotateY(180deg)" },
        },
        "rise": {
          "0%": { transform: "translateY(100%)", scale: "0" },
          "100%": { transform: "translateY(0%)", scale: "1" },
        },
        "bg-blur": {
          "0%": { backdropFilter: "blur(0px)" },
          "100%": { backdropFilter: "blur(10px)" },
        },
        // "to-transparent": {
        //   "0%": { opacity : "1" },
        //   "100%": { opacity : "0" },
        // },
      },
    },
    plugins: [],
  }
}
