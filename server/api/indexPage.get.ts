import { useFetchApi } from '~/composables/useFetchApi'
import { getCookie } from 'h3'
import { specialOfferLessData, modelLessData, newsLessData, type ModelWithLessData, type NewsWithoutContent } from '~/types/server'
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
  models: ModelWithLessData[],
  news: GroupedNews
  specialOffers: GroupedSpecialOfferWithoutContent,
  date: Date
}


export default defineEventHandler(async (event) => {

  const locale = getQuery(event).lang as string

  const sliders = await useFetchApi<IndexPageSlider[]>('/sliders', locale)

  const seo = await useFetchApi<SEO>(`/pages/~index`, locale)

  const specialOffers = await useFetchApi<SpecialOfferWithoutContent[]>(`/special-offers?fields=${specialOfferLessData.join(',')}`, locale)
  const news = await useFetchApi<NewsWithoutContent[]>(`/news?fields=${newsLessData.join(',')}`, locale)
  const models = await useFetchApi<ModelWithLessData[]>(`/models?fields=${modelLessData.join(',')}`, locale)
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
