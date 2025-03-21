import { useFetchApi } from '~/composables/useFetchApi'

export default defineEventHandler(async (event) => {
  const locale = getCookie(event, 'i18n_redirected')
  const slug = getRouterParam(event, 'slug')

  const news = await useFetchApi<News>(`/news/${slug}`, locale)



  return { news: news }
})
