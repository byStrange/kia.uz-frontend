/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: ({ theme }) => ({
        center: true,
        padding: {
          DEFAULT: theme("spacing.page-padding"),
        },
        screens: {},
      }),
      fontSize: {
        "sm+": ["15px", "20px"],
        xs: ["12px", "14px"],
        lg: ["18px", "24px"],
        sm: ["14px", "18px"],
        base: ["16px", "21px"],
        "3xl": ["32px", "40px"],
        "4xl": ["36px", "42px"],
        "5xl": ["42px", "48px"],
      },

      screens: {
        "2xl": "1440px",
      },

      colors: () => {
        const primitives = {
          "forest-green": "#5D7D2B",
          protection: "#CDD0D2",
          background: "#F7F8F8",
          description: "#37434C",
          "disabled-elements": "#9BA1A5",
          "city-gray": "#9EA1A2",
          "midnight-black": "#05141F",
          caption: "#697279",
        };

        const semantic = {
          "header-bg": "transparent",
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
        "page-padding": "31px",
        7.5: "1.875rem",
        4.5: "1.125rem",
        15: "3.75rem",
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      const screens = theme("screens");
      const screenProperties = {};
      for (const key in screens) {
        screenProperties["--screen-" + key] = screens[key];
      }
      addBase({
        ":root": {
          "--page-padding": theme("spacing.page-padding"),
          ...screenProperties,
        },
      });
    },
  ],
};
