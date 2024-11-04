/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: ({ theme }) => ({
        center: true,
        padding: {
          DEFAULT: theme('spacing.page-padding'),
        },
        screens: {},
      }),
      fontSize: {
        'sm+': ['15px', '20px'],
        xs: ['12px', '14px'],
        lg: ['18px', '24px'],
        sm: ['14px', '18px'],
        base: ['16px', '21px'],
        '3xl': ['32px', '40px'],
        '4xl': ['36px', '42px'],
        '5xl': ['42px', '48px'],
        '6xl': ['48px', '56px'],
        '7xl': ['56px', '64px'],
      },

      screens: {
        '2xl': '1440px',
      },

      borderRadius: {
        4: '0.25rem',
        8: '0.5rem',
        16: '1rem',
      },

      colors: () => {
        const primitives = {
          'kia-midnight-black': {
            DEFAULT: '#05141F',
            90: '#1D2B34',
            80: '#37434C',
            60: '#697279',
            40: '#9BA1A5',
            20: '#CDD0D2',
            10: '#E5E7E8',
          },
          'kia-polar-white': '#ffffff',
          'kia-live-red': '#EA0029',
          'kia-afternoon-yellow': '#F3C300',
          'kia-forest-green': '#5D7D2B',
          'kia-city-gray': '#9EA1A2',
        };

        const semantics = {
          primary: {
            DEFAULT: primitives['kia-midnight-black'].DEFAULT,
            black: primitives['kia-midnight-black'].DEFAULT,
            white: primitives['kia-polar-white'],
          },
          'depth-blue': primitives['kia-midnight-black'][90],
          description: primitives['kia-midnight-black'][80],
          caption: primitives['kia-midnight-black'][60],
          disabled: primitives['kia-midnight-black'][40],
          protection: primitives['kia-midnight-black'][20],
          background: '#F7F8F8',
          point: primitives['kia-live-red'],
          'afternoon-yellow': primitives['kia-afternoon-yellow'],
          'forest-green': primitives['kia-forest-green'],
          'city-gray': primitives['kia-city-gray'],
        };

        return {
          ...semantics,
          ...primitives,
        };
      },

      spacing: {
        'page-padding': '31px',
        7.5: '1.875rem',
        4.5: '1.125rem',
        15: '3.75rem',
        12.5: '3.125rem',
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      const screens = theme('screens');
      const screenProperties = {};
      for (const key in screens) {
        screenProperties['--screen-' + key] = screens[key];
      }
      addBase({
        ':root': {
          '--page-padding': theme('spacing.page-padding'),
          ...screenProperties,
        },
      });
    },
  ],
};
