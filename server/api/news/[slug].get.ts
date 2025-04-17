import { useFetchApi } from '~/composables/useFetchApi'

export default defineEventHandler(async (event) => {
  const locale = getQuery(event).lang as string
  const slug = getRouterParam(event, 'slug')

  const news = await useFetchApi<News>(`/news/${slug}`, locale)



  return { news: news }
})
