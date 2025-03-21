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
    label: 'Модели',
    to: '/models',
  },
  {
    label: 'Спецпредложения',
    to: '/special-offers',
  },
  {
    label: 'Дилеры',
    to: '/dealers',
  },
  {
    label: 'Владельцам',
    to: '#',
  },
  {
    label: 'Выбор и покупка',
    children: [
      {
        label: 'Запись на тест-драйв',
        to: '/models/test-drive',
      },
      {
        label: 'Трейд-ин',
        to: '#',
      },
      {
        label: 'Конфигуратор',
        to: '#',
      },
      {
        label: 'Подбор авто',
        to: '#',
      },

      {
        label: 'Корпоративные продажи',
        to: '/special-offers/corporate:programmee-trade-in',
      },
    ],
  },
  {
    label: 'Бренд Kia',
    children: [
      {
        label: 'Новый бренд Kia',
        to: '/branding',
      },
      { label: 'Дизайн', to: '#' },

      {
        label: 'История Kia',
        to: '/history/kia-history',
      },
      {
        label: 'Технологии',
        to: '#',
      },
    ],
  },
  {
    label: 'Kia в Узбекистане',
    children: [
      {
        label: 'О нас',
        to: '#',
      },
      {
        label: 'Преимущества дистрибьютера',
        to: '/distributor-advantages',
      },
      {
        label: 'Стать дилером',
        to: '/dealers',
      },

      {
        label: 'Новости',
        to: '/media-center',
      },
    ],
  },
])

const footerLinks = computed(() => footerItems)

export const useFooterService = () => {
  return { footerLinks }
}
