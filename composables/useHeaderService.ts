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
    label: 'Спецпредложения',
    to: '#',
    children: [
      {
        label: 'Авто в наличии',
        to: '#',
      },
      {
        label: 'Конфигуратор',
        to: '#',
      },
      {
        label: 'Тест-драйв',
        to: '#',
      },
      {
        label: 'Запрос предложения',
        to: '#',
      },
      {
        label: 'Трейд-ин',
        to: '#',
      },
      {
        label: 'Корпоративные продажи',
        to: '#',
      },
      {
        label: 'Сравнение авто',
        to: '#',
      },
    ],
  },
  {
    label: 'Выбор и покупка',
    to: '#',
    children: [
      {
        label: 'Авто в наличии',
        to: '#',
      },
      {
        label: 'Конфигуратор',
        to: '#',
      },
      {
        label: 'Тест-драйв',
        to: '#',
      },
      {
        label: 'Запрос предложения',
        to: '#',
      },
      {
        label: 'Трейд-ин',
        to: '#',
      },
      {
        label: 'Корпоративные продажи',
        to: '#',
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
    label: 'Спецпредложения',
    to: '#',
  },
  {
    label: 'Тест-драйв',
    to: '#',
  },
  {
    label: 'Владельцам',
    to: '#',
    meta: {
      sideImage:
        'https://ucarecdn.com/705a1d86-c695-4b24-8fea-8a89131ec537/-/preview/999x786/',
      sideText: 'Kia family Day',
    },
    children: [
      {
        label: 'Запись на сервис',
        to: '#',
      },
      {
        label: 'Запчасти',
        to: '#',
      },
      {
        label: 'Техническое обслуживание',
        to: '#',
      },
      {
        label: 'Гарантия',
        to: '#',
      },
      {
        label: 'Спецпредложения',
        to: '#',
      },
      {
        label: 'Руководство по эксплуатации',
        to: '#',
      },
    ],
  },
  {
    label: 'Дилеры',
    to: '#',
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

export const useHeaderService = () => {
  return {
    headerService,
    toggleMenu,
    closeExtendedMenu,
  }
}
