/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f4fc",
          100: "#e1e9f8",
          500: "#3b82f6",
          600: "#2563eb",
          900: "#1e3a8a",
        },
        surface: "#ffffff",
        background: "#f8fafc",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        premium: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
      },
    },
  },
  plugins: [],
};
