/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "flip": "flip 1s ease-in-out both",
        "rise": "rise 1s ease-in-out both",
        "bg-blur": "bg-blur 1s ease-in-out both",
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
      },
    },
    plugins: [],
  }
}
