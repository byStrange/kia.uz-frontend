import { useFetchApi } from '~/composables/useFetchApi'
import type { Model } from './models/[id]/index.get'
import { getCookie } from 'h3'
import type { GroupedNews } from '~/utils/serverUtils'
import { groupNewsByCategory, groupSpecialOffersByCategory } from '~/utils/serverUtils'

export interface IndexPageSlider extends CommonMediaModel {
  title: string
  pre_title: string
  post_title: string
  target_url: AbsoluteUrl
  order: number
}

export type IndexPageModel = {
  name: string
  url: RelativeUrl
  price: number
  image: AbsoluteUrl
  bg: AbsoluteUrl
}



type IndexPageSpecialOffer = SpecialOffer;

export interface IndexPage {
  seo: SEO['seo'],
  sliders: IndexPageSlider[],
  models: Model[],
  news: GroupedNews
  specialOffers: GroupedSpecialOffer
}


export default defineEventHandler(async (event) => {
  const locale = getCookie(event, 'i18n_redirected')

  const sliders = await useFetchApi<IndexPageSlider[]>('/sliders', locale)

  const seo = await useFetchApi<SEO>(`/pages/~index`, locale)

  const specialOffers = await useFetchApi<IndexPageSpecialOffer[]>('/special-offers', locale)
  const news = await useFetchApi<News[]>('/news', locale)
  const models = await useFetchApi<Model[]>('/models', locale)

  const pageData: IndexPage = {
    sliders,
    specialOffers: groupSpecialOffersByCategory(specialOffers),
    news: groupNewsByCategory(news),
    models,
    seo: seo['seo'],
  }

  return pageData
})
