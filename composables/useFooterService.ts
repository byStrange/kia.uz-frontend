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
    to: '#',
  },
  {
    label: 'Дилеры',
    to: '#',
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
        to: '#',
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
        to: '#',
      },
    ],
  },
  {
    label: 'Бренд Kia',
    children: [
      {
        label: 'Новый бренд Kia',
        to: '#',
      },
      { label: 'Дизайн', to: '#' },

      {
        label: 'История Kia',
        to: '#',
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
        to: '#',
      },
      {
        label: 'Стать дилером',
        to: '#',
      },

      {
        label: 'Новост',
        to: '#',
      },
    ],
  },
])

const footerLinks = computed(() => footerItems)

export const useFooterService = () => {
  return { footerLinks }
}
