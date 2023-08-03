import { fontFamily as _fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        open: ['"Open Sans"', ..._fontFamily.sans],
      },
      backgroundImage: {
        'gradient-radial-t': 'radial-gradient(103.72% 100px at 50% 0%,rgba(68,86,112,0.5) 0%,rgba(255,255,255,0) 100%)',
        'gradient-radial-tb': 'radial-gradient(103.72% 46.58% at 50% 100%,rgba(68,86,112,0.5) 0%,rgba(255,255,255,0) 100%),radial-gradient(103.72% 46.58% at 50% 0%,rgba(68,86,112,0.5) 0%,rgba(255,255,255,0) 100%)',
        'gradient-radial-tb-light': 'radial-gradient(103.72% 46.58% at 50% 100%,rgba(209, 196, 233,0.5) 0%,rgba(255,255,255,0) 100%),radial-gradient(103.72% 46.58% at 50% 0%,rgba(209, 196, 233,0.5) 0%,rgba(255,255,255,0) 100%)',
        'gradient-radial-tl': 'radial-gradient(103.72% 0px at 50% 0%,rgba(68,86,112,0.5) 0%,rgba(255,255,255,0) 100%),radial-gradient(50% 50% at -30% 50%,rgba(68,86,112,0.5) 0%,rgba(255,255,255,0) 100%)',
      },
      boxShadow: {
        'custom': '0px 0px 5px rgba(3,102,214,0.3)'
      },
      animation: {
        flash: "flash 1.4s infinite linear",
      },
      keyframes: {
        flash: {
          "0%": { opacity: "0.2" },
          "20%": { opacity: "1" },
          "100%": { opacity: "0.2" },
        },
      },

    },
  },
  plugins: [require("@tailwindcss/typography")],
}

