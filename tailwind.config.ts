import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#090a0d",
        surface: "#111318",
        panel: "#151820",
        line: "rgba(255,255,255,.09)",
        quiet: "#8b91a0",
        accent: "#c8ff44",
        blue: "#3157ff",
      },
      boxShadow: { terminal: "0 24px 80px rgba(0,0,0,.36)" },
      borderRadius: { terminal: "14px" },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
