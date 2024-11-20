import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    messages: {
      ru: {
        hello: 'Hello, {name}!',
      },
      uz: {
        hello: 'Привет, {name}!',
      },
    },
  })

  vueApp.use(i18n)
})
