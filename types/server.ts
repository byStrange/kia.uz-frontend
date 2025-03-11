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

export interface SpecialOffer extends CommonMediaModel {
  seo: SEO
  title: string
  content: HtmlText
  type: 'buy' | 'service'
  subtitle: string

}
