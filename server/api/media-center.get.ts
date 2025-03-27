import { useFetchApi } from '~/composables/useFetchApi'
import { emptySeo, groupNewsByCategory } from '~/utils/serverUtils'


export default defineEventHandler(async (event) => {
  const locale = getCookie(event, 'i18n_redirected')

  const news = await useFetchApi<News[]>('/news', locale)

  let seo: SEO;

  try {
    seo = await useFetchApi<SEO>('/pags/~media-center', locale)
  }
  catch {
    seo = emptySeo
  }

  const groupedNews = groupNewsByCategory(news)

  return { seo: seo['seo'], groupedNews }
})
