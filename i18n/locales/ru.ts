export default defineI18nLocale(async locale => {
	const translations = await $fetch('/api/translations')
	return translations[locale]
})
