import type { Model } from "~/server/api/models/[id]/index.get"
export type AbsoluteUrl = string
export type HtmlText = string
export type RelativeUrl = string
export type IntBool = 0 | 1
export type UnixTimestamp = number
export type uuid = string

export interface SEO {
  seo: {
    title: string
    description: string
    keywords: string
  },
  name: string
  url: string
}

export interface UUIDMixin {
  id: uuid
}

export interface TimeStampMixin {
  created_at: string
  updated_at: string
}

export interface ResponsiveImageMixin {
  default_image: string
  tablet_image?: string
  desktop_image?: string
}

export type CommonMediaModel = UUIDMixin & TimeStampMixin & ResponsiveImageMixin

export type CommonModel = UUIDMixin & TimeStampMixin

export interface SpecialOfferCategory extends CommonModel {
  name: string
}

export interface SpecialOffer extends CommonMediaModel {
  seo: SEO
  title: string
  category: SpecialOfferCategory | null
  content: HtmlText
  type: 'buy' | 'service'
  slug: string
  subtitle: string
  referenced_models: { id: string, name: string, main_image: AbsoluteUrl }[]
}

export interface ModelBlockSlide extends CommonMediaModel {
  title: string
}

export interface ModelBlock extends CommonMediaModel {
  title: string
  description: string
  label: string
  icon: string
  type: "heroIcon" | "doubleSlide" | "triple" | "footerContent" | "engineBlock"
  footer_background_image: string | null
  direction: "left" | "right"
  subtitle: string | null
  slides: ModelBlockSlide[]
}

export interface NewsCategory extends CommonModel {
  name: string
}



export interface News extends CommonMediaModel {
  seo: SEO,
  title: string
  category: NewsCategory | null
  content: HtmlText
  type: 'news' | 'review'
  slug: 'string'
  subtitle: string
  video_url: string
}

export type ModelWithLessData = Pick<Model, 'name' | 'id' | 'category' | 'main_image' | 'starting_price' | 'slug'>
