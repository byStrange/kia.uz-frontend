/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

const { withTV } = require('tailwind-variants/transformer')

module.exports = withTV({
  content: [
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'app.vue',
    'error.vue',
  ],
  theme: {
    extend: {
      transformOrigin: {
        'left-center': 'left center',
        'right-center': 'right center',
      },
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
        'sm+': ['0.9375rem', '20px'], // 15px
        xs: ['0.75rem', '14px'], // 12px
        'xs-long': ['0.75rem', { letterSpacing: '1.44', lineHeight: '15px' }],
        'xs+': ['0.75rem', '16px'], // 12px
        'xs++': ['0.75rem', '20px'], // 12px
        lg: ['1.125rem', '24px'], // 18px
        sm: ['0.875rem', '18px'], // 14px
        base: ['1rem', '21px'],
        'base+': ['1rem', '24px'],
        '2xl': [
          '1.5rem',
          {
            lineHeight: '32px',
            fontWeight: 600,
            letterSpacing: '-0.48px',
          },
        ],
        '3xl': [
          '2rem', // 32px
          {
            lineHeight: '40px',
            fontWeight: 600,
            letterSpacing: '-0.8px',
          },
        ],
        '4xl': [
          '2.25rem', // 36px
          {
            lineHeight: '42px',
            fontWeight: 600,
            letterSpacing: '-0.72px',
          },
        ],
        '5xl': [
          '2.625rem', // 42px
          {
            lineHeight: '48px',
            fontWeight: 600,
            letterSpacing: '-0.84px',
          },
        ],
        '6xl': [
          '3rem', // 48px
          {
            lineHeight: '56px',
            fontWeight: 600,
            letterSpacing: '-0.96px',
          },
        ],
        '6xl+': [
          '3.25rem', // 52px
          {
            lineHeight: '64px',
            fontWeight: 600,
            letterSpacing: '1.04',
          },
        ],
        '7xl': [
          '3.5rem', // 56px
          {
            lineHeight: '64px',
            fontWeight: 600,
            letterSpacing: '-1.12px',
          },
        ],
        '8xl': [
          '4rem', // 64px
          {
            lineHeight: '72px',
            fontWeight: 600,
            letterSpacing: '-1.28px',
          },
        ],
        '9xl': [
          '4.5rem', // 72px
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
          ptransparent: primitives['kia-midnight-black'][10],
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
        '1px': '1px',
        'page-padding': '1rem',
        'page-padding-2': '31px',
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
        '7.25h': '725px',
        '7.5h': '750px',
        '8h': '800px',
        '8.5h': '850px',
        '9h': '900px',
        'grid-12-gap': '2.5rem',
        '6h-10': '640px',
        '1k': '1000px',
        '1.06k': '1060px',
        'half-screen': '50vw',
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
})
