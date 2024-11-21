export default defineI18nConfig(() => ({
  locales: [
    {
      code: 'ru',
      iso: 'ru-RU',
      name: 'Русский',
    },
    {
      code: 'uz',
      iso: 'uz-UZ',
      name: 'O‘zbek',
    },
  ],
  locale: 'uz',
  messages: {
    ru: {
      welcome: 'Welcome',
    },
    uz: {
      welcome: 'Xush kelibsiz',
    },
  },
}))
