import { useFetchApi } from '~/composables/useFetchApi'
import type { Model } from '~/composables/useStore'

interface SpecialOffersPage {
  seo: SEO['seo'],
  offers: SpecialOffer[],
  models: Pick<Model, 'name' | 'id'>[]
}

export default defineEventHandler(async (event) => {
  const locale = getCookie(event, 'i18n_redirected')

  const offers = await useFetchApi<SpecialOffer[]>('/special-offers', locale)
  const seo = await useFetchApi<SEO>('/pages/~special-offers', locale)
  const models = await useFetchApi<SpecialOffersPage['models']>('/models?fields=name,id')


  const pageData: SpecialOffersPage = {
    offers, seo: seo['seo'], models
  }

  return pageData;
})
