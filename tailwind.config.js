module.exports = {
  content: ["./**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: "#0D2B45",
        "background-light": "#FDFDFD",
        "background-dark": "#050B10",
        secondary: "#1A3C5A",
        accent: "#E5E7EB",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
      },
    },
  },
  plugins: [],
};
