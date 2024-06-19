const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/renderer/src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: "2rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
        },
        center: true,
        screens: {
          md: "992px",
          lg: "1200px",
          xl: "1440px",
        },
      },
      screens: {
        xs: "576px",
        sm: "768px",
        md: "992px",
        lg: "1200px",
        xl: "1440px",
        xxl: "1600px",
      },
      colors: {
        cLight100: "#f7f7f7",
        cGray100: "#9d9d9d",
        cOrange100: "#ff6100",
        cOrange200: "#ff4f17",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".form-label-error": {
          color: "red",
          fontSize: "12px",
        },
        ".rsa-button": {
          padding: "5px 10px",
          border: "1px solid #9d9d9d",
          borderRadius: "5px",
          fontSize: "16px",
        },
      });
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
