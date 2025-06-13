import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: { max: "640px" },
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1600px",
    },
    extend: {
      colors: {
        brand: "hsl(210, 9%, 21%)",
        brandAlt: "hsl(212, 9%, 16%)",
        brandAlt2: "hsl(212, 14%, 28%)",
        brandLight: "hsl(0, 0%, 95%)",
        page: "#040225",
        text: "rgb(107 114 128)",
      },
      fontFamily: {
        pp: ["PP Monument Extended"],
        normal: ["Circular XX"],
        std: ["Circular Std"],
        halo: ["Halo Grotesk"],
      },
      fontSize: {
        xl: "1.5rem",
        "2xl": "2rem",
        "3xl": "3.5rem",
        "4xl": "7rem",
      },
      spacing: {
        page: "80%",
      },
    },
  },
  plugins: [],
};
export default config;
