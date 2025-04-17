import { useFetchApi } from '~/composables/useFetchApi'
import { groupSpecialOffersByCategory, emptySeo } from '~/utils/serverUtils'
import type { GroupedSpecialOfferWithoutContent } from '~/utils/serverUtils'
import type { Model } from '../models/[id]/index.get'

interface SpecialOffersPage {
  seo: SEO['seo'],
  offers: SpecialOffer[],
  models: Pick<Model, 'name' | 'id'>[],
  groupedOffers: GroupedSpecialOfferWithoutContent
}

export default defineEventHandler(async (event) => {

  const locale = getQuery(event).lang as string

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
