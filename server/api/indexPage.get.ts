import { useFetchApi } from '~/composables/useFetchApi'
import { getCookie } from 'h3'

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
  sliders: IndexPageSlider[], models: any[], news: any[]
  specialOffers: IndexPageSpecialOffer[]
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
    specialOffers,
    news,
    models,
    seo: seo['seo'],
  }

  return pageData
})
