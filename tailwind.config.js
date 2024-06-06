/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        steelblue: "#036c98",
        black: "#000",
        gainsboro: "#d9d9d9",
      },
      spacing: {},
      fontFamily: {
        "body-body1": "Roboto",
      },
      borderRadius: {
        xl: "20px",
        "31xl": "50px",
      },
    },
    fontSize: {
      base: "16px",
      "9xl": "28px",
      inherit: "inherit",
    },
  },
};
