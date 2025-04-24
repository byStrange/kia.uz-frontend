const {
  SITE_NAME,
  BASE_URL,
  NUXT_API_BASE_URL = 'https://adminkia.ting.uz',
  NUXT_API_DEFAULT_LANG = 'uz'
} = process.env

export default defineNuxtConfig({
  routeRules: {
    '*': { swr: true }
  },

  imports: {
    dirs: ['./composables', './utils', './schemas', './types'],
  },

  experimental: {
    defaults: {
      nuxtLink: {
        prefetchOn: {
          interaction: true,
        },
      },
    },
  },

  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  compatibilityDate: '2024-07-16',

  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/transitions.css',
    'lenis/dist/lenis.css',
  ],

  components: [
    {
      path: '~/components/icons',
      pathPrefix: false,
      prefix: 'UI',
    },
    {
      path: '~/components/atoms',
      pathPrefix: false,
      prefix: 'Atom',
    },
    {
      path: '~/components/elements',
      pathPrefix: false,
      prefix: 'Element',
    },
    {
      path: '~/components/molecules',

      pathPrefix: false,
      prefix: 'Molecule',
    },
    {
      path: '~/components/organisms',
      pathPrefix: false,
      prefix: 'Organism',
    },
    {
      path: '~/components/layout',
      pathPrefix: false,
      prefix: 'UI',
    },
  ],

  i18n: {
    baseUrl: BASE_URL,
    strategy: 'prefix_and_default',
    locales: [
      {
        code: 'ru',
        file: 'ru.ts',
        language: 'ru-RU',
      },
      {
        code: 'uz',
        file: 'uz.ts',
        language: 'uz-UZ',
      },
    ],
    lazy: true,
    defaultLocale: 'uz',
  },

  modules: [
    'nuxt-booster',
    '@nuxt/devtools',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/seo',
    '@primevue/nuxt-module',
    'nuxt-swiper',
    '@nuxtjs/i18n',
    'nuxt-multi-cache',
    '@zadigetvoltaire/nuxt-gtm'
  ],
  booster: {

    detection: {
      performance: true,
      browserSupport: true
    },

    performanceMetrics: {
      device: {
        hardwareConcurrency: { min: 2, max: 48 },
        deviceMemory: { min: 2 }
      },
      timing: {
        fcp: 800,
        dcl: 1200
      }
    },
  },
  gtm: {
    id: 'GTM-MQQRHWBT',
    enabled: process.env.NODE_ENV === 'production',
    defer: true
  },
  primevue: {
    autoImport: false,
    components: {
      prefix: 'Prime',
      include: [
        'Accordion',
        'AccordionHeader',
        'AccordionPanel',
        'AccordionContent',
        'CheckBox',
        'RadioButton',
      ],
    },
    importTheme: { from: '~/presets/Noir.ts' },
  },

  runtimeConfig: {
    public: {
      siteName: SITE_NAME,
      siteUrl: BASE_URL,
      yandexMapApiKey: process.env.YANDEX_MAP_API_KEY,
      apiBaseUrl: NUXT_API_BASE_URL,
      apiDefaultLang: NUXT_API_DEFAULT_LANG
    },
  },

  multiCache: {
    component: {
      enabled: true
    }
  },

  devtools: {
    timeline: {
      enabled: true
    }
  }
})
