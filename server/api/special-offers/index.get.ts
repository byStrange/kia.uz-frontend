import type { IndexPageNews } from '../indexPage.get'

type SpecialOffersPageSpecialOffer = IndexPageNews

interface SpecialOffersPage extends SEOPage {
  news: SpecialOffersPageSpecialOffer[]
}

export default defineEventHandler(async (event) => {
  const locale = getCookie(event, 'i18n_redirected')

  const response = await useFetchApi<SpecialOffersPage>('/buy/special', locale)

  return response
})
