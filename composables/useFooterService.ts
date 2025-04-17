import type { RouteLocationRaw } from 'vue-router'

export type FooterItem =
  | {
    label: string
    to: RouteLocationRaw
    children?: never // Ensures no `children` when `to` is present
  }
  | {
    label: string
    to?: never // Ensures `to` is not set when `children` is present
    children: FooterItem[]
  }
const footerItems = ref<FooterItem[]>([
  {
    label: 'common.models',
    to: '/models',
  },
  {
    label: 'common.special_offers',
    to: '/special-offers',
  },
  {
    label: 'common.dealers',
    to: '/dealers',
  },
  {
    label: 'common.for_owners',
    to: '#',
  },
  {
    label: 'common.select_and_purchase',
    children: [
      {
        label: 'common.test_drive',
        to: '/models/test-drive',
      },
      {
        label: 'common.corporate_sales',
        to: '/special-offers/corporate-sales',
      },
    ],
  },
  {
    label: 'common.brand_kia',
    children: [
      {
        label: 'common.new_brand_kia',
        to: '/branding',
      },
      {
        label: 'common.kia_history',
        to: '/history/kia-history',
      },
      {
        label: 'common.kia_sponsorships',
        to: '/history/sponsorships'
      }
    ],
  },
  {
    label: 'common.kia_in_uzbekistan',
    children: [
      {
        label: 'common.distributor_advantages',
        to: '/distributor-advantages',
      },
      {
        label: 'common.news',
        to: '/media-center',
      },
    ],
  },
])

const footerLinks = computed(() => footerItems)

export const useFooterService = () => {
  return { footerLinks }
}
