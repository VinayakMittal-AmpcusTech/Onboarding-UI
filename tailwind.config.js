/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["node_modules/preline/dist/*.js", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},

    // screens: {
    //   xs: { min: "300px", max: "575px" },
    //   sm: { min: "576px", max: "767px" },

    //   // => @media (min-width: 576px and max-width: 768px) { ... }

    //   md: { min: "768px", max: "1024px" },

    //   // => @media (min-width: 768px and max-width: 1024px) { ... }

    //   lg: { min: "1025px", max: "1280px" },

    //   // => @media (min-width: 1025px and max-width: 1280px) { ... }

    //   xl: { min: "1281px", max: "1366px" },

    //   // => @media (min-width: 1281px and max-width: 1366px) { ... }

    //   "1xl": { min: "1367px", max: "1535px" },

    //   // => @media (min-width: 1367px and max-width: 1535px) { ... }

    //   "2xl": { min: "1536px" },

    //   // => @media (min-width: 1536px) { ... }
    // },
  },

  plugins: ["node_modules/preline/dist/*.js"],
};
