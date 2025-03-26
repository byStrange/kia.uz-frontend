import { useFetchApi } from '~/composables/useFetchApi'


export default defineEventHandler(async (event) => {
  const locale = getCookie(event, 'i18n_redirected')

  const news = await useFetchApi<News[]>('/news', locale)

  let seo: SEO;

  try {
    seo = await useFetchApi<SEO>('/pags/~dealers', locale)
  }
  catch {
    seo = emptySeo
  }



  return { news: news.filter(n => n.type == 'news'), video_news: news.filter(n => n.type == 'review'), seo: seo['seo'] }
})
