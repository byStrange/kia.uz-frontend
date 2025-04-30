import { useFetchApi } from "~/composables/useFetchApi"

interface ModelCategory extends CommonModel {
  name: string
}

export interface ThreeSixtyImage extends CommonModel {
  source_file: string;
  prefix: string
  configuration: uuid| null
}

export interface ModelColor extends CommonModel {
  name: string
  code: string
  color_type: 'interior' | 'exterior',
  add_to_cost: number
  metallic: boolean
  three_sixty: ThreeSixtyImage
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

export interface InstallmentPlan extends CommonModel {
  months: number
  minimum_prepayment: number
  prepayment_calculated: number
  annual_interest: null | number
  monthly_payment: null | number
  configuration: uuid
}

export interface Configuration extends CommonModel {
  name: string
  price: number
  compare_price: number
  feature_groups: FeatureGroup[]
  installment_options: InstallmentPlan[],
  minimum_prepayment: number,
  annual_interest_rate: number,
  repayment_months: number,
  installment_months: number
  credit_payment: number | null,
  interest_free_installment_plan: number | null;
  installment_minimum_prepayment: number

  engine?: string
}


export interface ModelEngine extends CommonModel {
  name: string
  desc: string
  power: number
  configurations: Configuration[]
  gear: ModelGear
  drive: ModelActuation
  torque: number
  fuel_type: string
  working_volume: string
  working_volume_cube: string
  eco_class: string
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
  most_benefit: number
  main_image: string
  order: number
  side_image: string
  user_manual: string | null
  seo: SEO['seo']
  category: ModelCategory
  starting_price: number
  old_price: number
  brochure: string | null
  price_list: string | null
  show_in_telegram: boolean,
  show_in_home: boolean,
  test_drive_available: boolean,
  show_old_prices: boolean,
  is_electric: boolean,
  pre_title: string | null
  video: string | null
  post_title: string | null
}

export interface ModelLandingPage {
  model: Model
  specialOffers: SpecialOffer[]
  news: News[]
  configurations: Configuration[]
}


export default defineEventHandler(async (event) => {

  const locale = getQuery(event).lang as string,
    param = getRouterParam(event, 'id');

  if (!param) return {}

  const model = await useFetchApi<Model>('/models/' + param, locale),

    referencedSpecialOffers = await useFetchApi<SpecialOffer[]>('/special-offers/?referenced_models=' + model.id, locale),

    referencedNews = await useFetchApi<News[]>('/news/?referenced_models=' + model.id, locale),

    configurations = model.engines.map((engine) => engine.configurations.map((configuration) => ({ ...configuration }))).flat();

  const pageData: ModelLandingPage = {
    model, specialOffers: referencedSpecialOffers, configurations, news: referencedNews
  }
  return pageData
})
