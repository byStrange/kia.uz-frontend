import { useFetchApi } from "~/composables/useFetchApi"

interface ModelCategory extends CommonModel {
  name: string
}

export interface ModelColor extends CommonModel {
  name: string
  code: string
  color_type: 'interior' | 'exterior',
  add_to_cost: number
  metallic: boolean
  three_sixty_url: AbsoluteUrl
  image?: AbsoluteUrl
}


interface ModelGear extends CommonModel {
  name: string
  desc: string
}

interface ModelActuation {
  name: string
  desc: string
}

interface Feature extends CommonModel {
  name: string
}

export interface FeatureGroup extends CommonModel {
  name: string
  features: Feature[]
  is_featured: boolean
}

export interface Configuration extends CommonModel {
  name: string
  price: number
  compare_price: number
  feature_groups: FeatureGroup[]
  // percent
  minimum_prepayment: number

  // percent
  minimum_bet: number

  maximum_bet: number

  // in days
  minimum_repayment_period: number
  maximum_repayment_period: number
  engine?: string
}

export interface ModelEngine extends CommonModel {
  name: string
  desc: string
  power: number
  configurations: Configuration[]
  gears: ModelGear[]
  actuations: ModelActuation[]
  torque: number
  fuel_type: string
  working_volume: string
  working_volume_cube: string
  eco_class: string
  drive: string
  acceleration_time: string
  fuel_consumption: string
  city_fuel_gkm: string
  highway_fuel_gkm: string
  combined_cycling_gkm: string
  body_type: string
  dimensions: string
  wheelbase: string
  ground_clearance: string
  trunk_volume: string
}

export interface Model extends CommonMediaModel {
  name: string
  slug: string
  colors: ModelColor[]
  engines: ModelEngine[]
  blocks: ModelBlock[]
  main_image: string
  side_image: string
  seo: SEO['seo']
  category: ModelCategory
  starting_price: number
  brochure: string | null
  price_list: string | null
  show_in_telegram: boolean,
  show_in_home: boolean,
  test_drive_available: boolean,
  show_old_prices: boolean,
  is_electric: boolean,
  pre_title: string | null
  post_title: string | null
}

export interface ModelLandingPage {
  model: Model
  specialOffers: SpecialOffer[]
  news: News[]
  configurations: Configuration[]
}


export default defineEventHandler(async (event) => {
  const locale = getCookie(event, 'i18n_redirected'),
  param = getRouterParam(event, 'id'),

    model = await useFetchApi<Model>('/models/' + param, locale),

    referencedSpecialOffers = await useFetchApi<SpecialOffer[]>('/special-offers/?referenced_models=' + model.id),

    referencedNews = await useFetchApi<News[]>('/news/?referenced_models=' + model.id, locale),

    configurations = model.engines.map((engine) => engine.configurations.map((configuration) => ({ ...configuration }))).flat();

  const pageData: ModelLandingPage = {
    model, specialOffers: referencedSpecialOffers, configurations, news: referencedNews
  }
  return pageData
})
