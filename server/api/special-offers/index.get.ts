import { useFetchApi } from '~/composables/useFetchApi'
import { groupSpecialOffersByCategory, emptySeo } from '~/utils/serverUtils'
import type { Model } from '~/composables/useStore'
import type { GroupedSpecialOffer } from '~/utils/serverUtils'

interface SpecialOffersPage {
  seo: SEO['seo'],
  offers: SpecialOffer[],
  models: Pick<Model, 'name' | 'id'>[],
  groupedOffers: GroupedSpecialOffer
}

export default defineEventHandler(async (event) => {
  const locale = getCookie(event, 'i18n_redirected')

  const offers = await useFetchApi<SpecialOffer[]>('/special-offers', locale)

  let seo: SEO;

  try {
    seo = await useFetchApi<SEO>('/pages/~special-offers', locale)
  }
  catch {
    seo = emptySeo
  }


  const models = await useFetchApi<SpecialOffersPage['models']>('/models?fields=name,id')

  const groupedOffers = groupSpecialOffersByCategory(offers)


  const pageData: SpecialOffersPage = {
    offers, seo: seo['seo'], models, groupedOffers
  }

  return pageData;
})
