const { SITE_NAME, SITE_URL } = process.env

export default defineNuxtConfig({
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  compatibilityDate: '2024-07-16',

  css: ['~/assets/css/fonts.css', '~/assets/css/transitions.css'],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
      prefix: 'UI',
    },
    {
      path: '~/components/pages/',
      pathPrefix: false,
      prefix: 'Section',
    },
  ],

  modules: [
    '@nuxt/devtools',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/seo',
    '@primevue/nuxt-module',
    'nuxt-swiper',
  ],

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
      siteUrl: SITE_URL,
    },
  },
})
