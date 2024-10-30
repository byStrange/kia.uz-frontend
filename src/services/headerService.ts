import FacebookIcon from '@/components/icons/socials/FacebookIcon.vue';
import InstagramIcon from '@/components/icons/socials/InstagramIcon.vue';
import TelegramIcon from '@/components/icons/socials/TelegramIcon.vue';
import YoutubeIcon from '@/components/icons/socials/YoutubeIcon.vue';
import VueComponent from '@/types';
import { h, Ref, watch } from 'vue';
import { ref } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import { useScrollLock } from '@vueuse/core';

export type HeaderItem = {
  label: string;
  to: RouteLocationRaw;
  children?: HeaderItem[];
  meta?: { sideImage: string; sideText: string };
};

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
]);

export type Social = {
  icon: VueComponent;
  link: string;
};

type headerServiceType = {
  isMenuOpen: boolean;
  isHover: boolean;
  isHeaderFixed: boolean;
  extendedMenu: HeaderItem | null;

  routes: HeaderItem[] | Ref<HeaderItem[]>;
  phoneLine1: string;
  phoneLine2: string;
  phoneLine3: string;
  socials: Social[];
};

const headerService = ref<headerServiceType>({
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
      icon: h(YoutubeIcon),
      link: 'https://facebook.com/kia_uz',
    },
    {
      icon: h(InstagramIcon),
      link: 'https://instagram.com/kia_uz',
    },
    {
      icon: h(FacebookIcon),
      link: 'https://twitter.com/kia_uz',
    },
    {
      icon: h(TelegramIcon),
      link: 'https://facebook.com/kia_uz',
    },
  ],
});

const isLocked = useScrollLock(document.body);

const toggleMenu = () => {
  headerService.value.isMenuOpen = !headerService.value.isMenuOpen;
  console.log(
    'header menu ',
    headerService.value.isMenuOpen,
    ' header fixed',
    headerService.value.isHeaderFixed
  );
  console.log(
    headerService.value.isMenuOpen || headerService.value.isHeaderFixed
  );
  headerService.value.isHover =
    headerService.value.isMenuOpen || headerService.value.isHeaderFixed;
  console.log(headerService.value.isHover);
  isLocked.value = headerService.value.isMenuOpen;
};

const closeExtendedMenu = () => {
  headerService.value.extendedMenu = null;
  headerService.value.isMenuOpen = false;
  headerService.value.isHover = headerService.value.isHeaderFixed;
  isLocked.value = false;
};

watch(
  headerService,
  () => {
    console.log(headerService.value);
  },
  { deep: true }
);

export const useHeaderService = () => {
  return {
    headerService,
    toggleMenu,
    closeExtendedMenu,
  };
};
