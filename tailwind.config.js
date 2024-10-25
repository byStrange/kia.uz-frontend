/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: ({ theme }) => {
        return {
          center: true,
          padding: {
            DEFAULT: theme("spacing.page-padding"),
            "2xl": "0px",
          },
          screens: {
            "2xl": "1440px",
          },
        };
      },
      fontSize: {
        "sm+": ["15px", "20px"],
      },

      screens: {
        "2xl": "1440px",
      },

      colors: () => {
        const primitives = {
          protection: "#CDD0D2",
          "city-gray": "#9EA1A2",
          "midnight-black": "#05141F",
          caption: "#697279",
        };

        const semantic = {
          "header-bg": "white",
          primary: primitives["midnight-black"],
          secondary: primitives["city-gray"],
        };

        semantic["text"] = semantic["primary"];

        return {
          ...primitives,
          semantic,
        };
      },

      spacing: {
        "page-padding": "1rem",
        7.5: "1.875rem",
        4.5: "1.125rem",
      },
    },
  },
  plugins: [],
};
