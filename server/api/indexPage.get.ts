import { useFetchApi } from '~/composables/useFetchApi'
import type { Model } from './models/[id]/index.get'
import { getCookie } from 'h3'
import { specialOfferLessData } from '~/types/server'
import type { GroupedNews, GroupedSpecialOfferWithoutContent } from '~/utils/serverUtils'
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


export interface IndexPage {
  seo: SEO['seo'],
  sliders: IndexPageSlider[],
  models: Model[],
  news: GroupedNews
  specialOffers: GroupedSpecialOfferWithoutContent,
  date: Date
}


export default defineEventHandler(async (event) => {

  const locale = getCookie(event, 'i18n_redirected')

  const sliders = await useFetchApi<IndexPageSlider[]>('/sliders', locale)

  const seo = await useFetchApi<SEO>(`/pages/~index`, locale)

  const specialOffers = await useFetchApi<SpecialOfferWithoutContent[]>(`/special-offers?fields=${specialOfferLessData.join(',')}`, locale)
  const news = await useFetchApi<News[]>('/news', locale)
  const models = await useFetchApi<Model[]>('/models', locale)
  const date = new Date()


  const pageData: IndexPage = {
    sliders,
    specialOffers: groupSpecialOffersByCategory(specialOffers),
    news: groupNewsByCategory(news),
    models,
    seo: seo['seo'],
    date
  }

  return pageData
})
