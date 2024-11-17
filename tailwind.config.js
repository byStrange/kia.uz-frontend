/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss/plugin'

module.exports = {
  content: [
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'app.vue',
    'error.vue',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '31px',
        },
        screens: {},
      },

      fontFamily: {
        body: [
          'Kia Signature',
          'Kia Signature Fix OTF',
          'ui-sans-serif',
          'system-ui',
        ],
      },
      fontSize: {
        'sm+': ['15px', '20px'],
        xs: ['12px', '14px'],
        'xs+': ['12px', '16px'],
        lg: ['18px', '24px'],
        sm: ['14px', '18px'],
        base: ['16px', '21px'],
        'base+': ['16px', '24px'],
        '3xl': [
          '32px',
          {
            lineHeight: '40px',
            fontWeight: 600,
            letterSpacing: '-0.8px',
          },
        ],
        '4xl': [
          '36px',
          {
            lineHeight: '42px',
            fontWeight: 600,
            letterSpacing: '-0.72px',
          },
        ],
        '5xl': [
          '42px',
          {
            lineHeight: '48px',
            fontWeight: 600,
            letterSpacing: '-0.84px',
          },
        ],
        '6xl': [
          '48px',
          {
            lineHeight: '56px',
            fontWeight: 600,
            letterSpacing: '-0.96px',
          },
        ],
        '7xl': [
          '56px',
          {
            lineHeight: '64px',
            fontWeight: 600,
            letterSpacing: '-1.12px',
          },
        ],
        '8xl': [
          '64px',
          {
            lineHeight: '72px',
            fontWeight: 600,
            letterSpacing: '-1.28px',
          },
        ],
        '9xl': [
          '72px',
          {
            lineHeight: '76px',
            fontWeight: 600,
            letterSpacing: '-1.44px',
          },
        ],
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
        }

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
        }

        return {
          ...semantics,
          ...primitives,
        }
      },

      spacing: {
        'page-padding': '1rem',
        1.25: '0.3125rem',
        7.5: '1.875rem',
        4.5: '1.125rem',
        15: '3.75rem',
        12.5: '3.125rem',
        '1h': '100px',
        '1.5h': '150px',
        '2h': '200px',
        '2.5h': '250px',
        '3h': '300px',
        '3.5h': '350px',
        '4h': '400px',
        '4.5h': '450px',
        '5h': '500px',
        '5.5h': '550px',
        '6h': '600px',
        '6.5h': '650px',
        '7h': '700px',
        '7.5h': '750px',
        '8h': '800px',
        '8.5h': '850px',
        'grid-12-gap': '2.5rem',
        '6h-10': '640px',
      },
    },
  },
  plugins: [
    plugin(
      function hoverablePlugin({ matchVariant }) {
        matchVariant(
          'hoverable',
          (value = 'DEFAULT') => {
            // Handle different hover behaviors based on the value
            switch (value) {
              case 'force':
                return '@media (hover: hover) and (pointer: fine)'
              case 'any':
                return '@media (any-hover: hover)'
              default:
                return '@media (hover: hover)'
            }
          },
          {
            values: {
              DEFAULT: '',
              force: 'force', // For devices with fine pointer only
              any: 'any', // For any hover-capable device
            },
          },
        )
      },
      {
        // Optional theme configuration
        theme: {
          hoverable: {
            // You can add custom configurations here if needed
          },
        },
      },
    ),

    function ({ addBase, theme }) {
      const screens = theme('screens')
      const screenProperties = {}
      for (const key in screens) {
        screenProperties['--screen-' + key] = screens[key]
      }
      addBase({
        ':root': {
          '--page-padding': theme('spacing.page-padding'),
          ...screenProperties,
        },
      })
    },
  ],
}
