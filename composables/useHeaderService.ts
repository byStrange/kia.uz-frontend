import type { RouteLocationRaw } from 'vue-router'

import {
  UIYoutubeIcon,
  UIFacebookIcon,
  UITelegramIcon,
  UIInstagramIcon,
} from '#components'

export type HeaderItem = {
  label: string
  to: RouteLocationRaw
  children?: HeaderItem[]
  meta?: { sideImage: string; sideText: string }
}

const headerItems = ref<HeaderItem[]>([
  {
    label: 'common.models',
    to: '/models',
  },
  {
    label: 'common.select_and_purchase',
    to: '#',
    children: [
      {
        label: 'Авто в наличии',
        to: '#',
      },
      {
        label: 'common.configurator',
        to: '#',
      },
      {
        label: 'common.test_drive',
        to: '/models/test-drive',
      },
      {
        label: 'Запрос предложения',
        to: '#',
      },
      {
        label: 'common.trade_in',
        to: '#',
      },
      {
        label: 'common.corporate_sales',
        to: '/special-offers/corporate:programmee-trade-in',
      },
      {
        label: 'Сравнение авто',
        to: '#',
      },
    ],
    meta: {
      sideImage:
        'https://ucarecdn.com/49025524-8444-4574-9478-89ad0f7e6b96/-/preview/999x664/',

      sideText: 'Выгода до 94 880 000 сум: Sorento, K8, Cerato, Seltos и Bongo',
    },
  },
  {
    label: 'common.special_offers',
    to: '/special-offers',
  },
  {
    label: 'common.test_drive',
    to: '/models/test-drive',
  },
  {
    label: 'common.for_owners',
    to: '#',
    meta: {
      sideImage:
        'https://ucarecdn.com/705a1d86-c695-4b24-8fea-8a89131ec537/-/preview/999x786/',
      sideText: 'Kia family Day',
    },
    children: [
      {
        label: 'Запись на сервис',
        to: '/service',
      },
      {
        label: 'Запчасти',
        to: '/spare-parts',
      },
      {
        label: 'Техническое обслуживание',
        to: '/owners/technical-maintenance',
      },
      {
        label: 'Гарантия',
        to: '/service/warranty',
      },
      {
        label: 'common.special_offers',
        to: '/special-offers',
      },
      {
        label: 'Руководство по эксплуатации',
        to: '#',
      },
    ],
  },
  {
    label: 'common.dealers',
    to: '/dealers',
  },
])

export type Social = {
  icon: any
  link: string
}

type headerServiceType = {
  lockHover: boolean
  isMenuOpen: boolean
  isHover: boolean
  isHeaderFixed: boolean
  extendedMenu: HeaderItem | null

  routes: HeaderItem[] | Ref<HeaderItem[]>
  phoneLine1: string
  phoneLine2: string
  phoneLine3: string
  socials: Social[]
}

const headerService = ref<headerServiceType>({
  lockHover: false,
  isMenuOpen: false,
  isHover: false,
  isHeaderFixed: false,
  extendedMenu: null,
  routes: headerItems,
  phoneLine1: '1333',
  phoneLine2: '+998 71 215-70-07',
  phoneLine3: '+998 71 209-15-24',
  socials: [
    {
      icon: h(UIYoutubeIcon),
      link: 'https://facebook.com/kia_uz',
    },
    {
      icon: h(UIInstagramIcon),
      link: 'https://instagram.com/kia_uz',
    },
    {
      icon: h(UIFacebookIcon),
      link: 'https://twitter.com/kia_uz',
    },
    {
      icon: h(UITelegramIcon),
      link: 'https://facebook.com/kia_uz',
    },
  ],
})

export const isLocked = useScrollLock(import.meta.client ? document.body : null)

const toggleMenu = () => {
  headerService.value.isMenuOpen = !headerService.value.isMenuOpen

  if (!headerService.value.lockHover) {
    headerService.value.isHover =
      headerService.value.isMenuOpen || headerService.value.isHeaderFixed
  } else {
    headerService.value.isHover = headerService.value.lockHover
  }

  isLocked.value = headerService.value.isMenuOpen
}

const closeExtendedMenu = () => {
  headerService.value.extendedMenu = null
  headerService.value.isMenuOpen = false

  if (!headerService.value.lockHover) {
    headerService.value.isHover = headerService.value.isHeaderFixed
  } else {
    headerService.value.isHover = headerService.value.lockHover
  }

  isLocked.value = false
}

/**
 * Locks the header
 *
 * Locking header means that the header will be
 * fixed on the top of the page and will
 * have background of white not transparent
 *
 */
const lockHeader = () => {
  headerService.value.lockHover = true
  headerService.value.isHeaderFixed = true
}

const unlockHeader = () => {
  headerService.value.lockHover = false
  headerService.value.isHeaderFixed = false
  headerService.value.isHover = false
}

export const useHeaderService = () => {
  return {
    lockHeader,
    unlockHeader,
    headerService,
    toggleMenu,
    closeExtendedMenu,
  }
}
