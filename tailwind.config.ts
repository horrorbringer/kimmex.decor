import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#fffdfc",
          100: "#f7f4ee",
          200: "#efe7dc",
          300: "#e3d9cb",
          400: "#d8cec2"
        },
        ink: {
          700: "#5f574f",
          900: "#2f2a26"
        },
        bronze: {
          500: "#8a6a4a",
          600: "#a88662"
        },
        olive: {
          500: "#6f8a6a"
        }
      },
      boxShadow: {
        card: "0 18px 40px rgba(47, 42, 38, 0.06)"
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["Arial", "Helvetica", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
