import { useFetchApi } from '~/composables/useFetchApi'


export default defineEventHandler(async (event) => {
  const locale = getCookie(event, 'i18n_redirected')

  const news = await useFetchApi<News[]>('/news', locale)



  return { news: news.filter(n => n.type == 'news'), video_news: news.filter(n => n.type == 'review') }
})
