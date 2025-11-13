/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  darkMode: "class",
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "purple",
          secondary: "teal",
          accent: "#f97316",
          neutral: "#3D4451",
          "base-100": "#ffffff",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
};
