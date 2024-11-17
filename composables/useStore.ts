const _specials = ref([
  {
    title: 'Kia лизинг',
    thumbnail:
      'https://ucarecdn.com/735c8746-b7a4-4074-96d3-f6345fccad98/-/preview/999x765/',
    description: 'Выгодные условия лизинга с предоплатой от 20%',
    href: '#',
  },

  {
    title: 'Выгода до 94 880 000 сум: Sorento, K8, Cerato, Seltos и Bongo',
    thumbnail:
      'https://ucarecdn.com/919c823a-2295-48ef-9ee4-f4468f22b43d/-/preview/999x765/',
    description: 'Предложение действует до 31/10/2024',
    href: '#',
  },
  {
    title: 'Специальные условия кредитования от Asakabank',
    thumbnail:
      'https://ucarecdn.com/e9cee8db-9d53-42ef-ab09-c9160edb8e44/-/preview/999x765/',
    description: 'Льготный кредит от 14% годовых',
    href: '#',
  },
  {
    title: 'Специальные условия кредитования от Davr Bank',
    thumbnail:
      'https://ucarecdn.com/9c56de1c-c413-435b-a7f4-2467ef8a0dac/-/preview/999x765/',
    href: '#',
    description: 'Первоначальный взнос от 25%',
  },
  {
    title: 'Kia лизинг',
    thumbnail:
      'https://ucarecdn.com/735c8746-b7a4-4074-96d3-f6345fccad98/-/preview/999x765/',
    description: 'Выгодные условия лизинга с предоплатой от 20%',
    href: '#',
  },

  {
    title: 'Выгода до 94 880 000 сум: Sorento, K8, Cerato, Seltos и Bongo',
    thumbnail:
      'https://ucarecdn.com/919c823a-2295-48ef-9ee4-f4468f22b43d/-/preview/999x765/',
    description: 'Предложение действует до 31/10/2024',
    href: '#',
  },
  {
    title: 'Специальные условия кредитования от Asakabank',
    thumbnail:
      'https://ucarecdn.com/e9cee8db-9d53-42ef-ab09-c9160edb8e44/-/preview/999x765/',
    description: 'Льготный кредит от 14% годовых',
    href: '#',
  },
  {
    title: 'Специальные условия кредитования от Davr Bank',
    thumbnail:
      'https://ucarecdn.com/9c56de1c-c413-435b-a7f4-2467ef8a0dac/-/preview/999x765/',
    href: '#',
    description: 'Первоначальный взнос от 25%',
  },
])

export type Model = {
  title: string
  electric: boolean
  images: {
    small: string
    medium: string
  }
}

const _models = ref<Model[]>([
  {
    title: 'Sonet',
    electric: true,
    images: {
      small:
        'https://ucarecdn.com/548a3e08-011b-41b5-a074-a0b06917d3e9/-/preview/336x160/',
      medium:
        'https://ucarecdn.com/ae0d4df7-3a0c-45c7-9074-9bb56ab035ab/-/preview/1000x450/',
    },
  },
  {
    title: 'K5',
    electric: false,
    images: {
      small:
        'https://ucarecdn.com/0573bd47-db16-48a2-b4df-ced019edc53c/-/preview/336x160/',
      medium:
        'https://ucarecdn.com/ae0d4df7-3a0c-45c7-9074-9bb56ab035ab/-/preview/1000x450/',
    },
  },
  {
    title: 'Sportage',
    electric: false,
    images: {
      small:
        'https://ucarecdn.com/719c6d52-d429-41a8-89a3-2f7e6d29be2d/-/preview/336x160/',
      medium:
        'https://ucarecdn.com/ae0d4df7-3a0c-45c7-9074-9bb56ab035ab/-/preview/1000x450/',
    },
  },
  {
    title: 'Sportage',
    electric: false,
    images: {
      small:
        'https://ucarecdn.com/719c6d52-d429-41a8-89a3-2f7e6d29be2d/-/preview/336x160/',
      medium:
        'https://ucarecdn.com/ae0d4df7-3a0c-45c7-9074-9bb56ab035ab/-/preview/1000x450/',
    },
  },
  {
    title: 'Sportage',
    electric: false,
    images: {
      small:
        'https://ucarecdn.com/719c6d52-d429-41a8-89a3-2f7e6d29be2d/-/preview/336x160/',
      medium:
        'https://ucarecdn.com/ae0d4df7-3a0c-45c7-9074-9bb56ab035ab/-/preview/1000x450/',
    },
  },

  {
    title: 'Sportage',
    electric: false,
    images: {
      small:
        'https://ucarecdn.com/719c6d52-d429-41a8-89a3-2f7e6d29be2d/-/preview/336x160/',
      medium:
        'https://ucarecdn.com/ae0d4df7-3a0c-45c7-9074-9bb56ab035ab/-/preview/1000x450/',
    },
  },
  {
    title: 'Sportage',
    electric: false,
    images: {
      small:
        'https://ucarecdn.com/719c6d52-d429-41a8-89a3-2f7e6d29be2d/-/preview/336x160/',
      medium:
        'https://ucarecdn.com/ae0d4df7-3a0c-45c7-9074-9bb56ab035ab/-/preview/1000x450/',
    },
  },
  {
    title: 'Sportage',
    electric: false,
    images: {
      small:
        'https://ucarecdn.com/719c6d52-d429-41a8-89a3-2f7e6d29be2d/-/preview/336x160/',
      medium:
        'https://ucarecdn.com/ae0d4df7-3a0c-45c7-9074-9bb56ab035ab/-/preview/1000x450/',
    },
  },
  {
    title: 'Sportage',
    electric: false,
    images: {
      small:
        'https://ucarecdn.com/719c6d52-d429-41a8-89a3-2f7e6d29be2d/-/preview/336x160/',
      medium:
        'https://ucarecdn.com/ae0d4df7-3a0c-45c7-9074-9bb56ab035ab/-/preview/1000x450/',
    },
  },
  {
    title: 'Sportage',
    electric: false,
    images: {
      small:
        'https://ucarecdn.com/719c6d52-d429-41a8-89a3-2f7e6d29be2d/-/preview/336x160/',
      medium:
        'https://ucarecdn.com/ae0d4df7-3a0c-45c7-9074-9bb56ab035ab/-/preview/1000x450/',
    },
  },
  {
    title: 'Sportage',
    electric: false,
    images: {
      small:
        'https://ucarecdn.com/719c6d52-d429-41a8-89a3-2f7e6d29be2d/-/preview/336x160/',
      medium:
        'https://ucarecdn.com/ae0d4df7-3a0c-45c7-9074-9bb56ab035ab/-/preview/1000x450/',
    },
  },
  {
    title: 'Sportage',
    electric: false,
    images: {
      small:
        'https://ucarecdn.com/719c6d52-d429-41a8-89a3-2f7e6d29be2d/-/preview/336x160/',
      medium:
        'https://ucarecdn.com/ae0d4df7-3a0c-45c7-9074-9bb56ab035ab/-/preview/1000x450/',
    },
  },
  {
    title: 'Sportage',
    electric: false,
    images: {
      small:
        'https://ucarecdn.com/719c6d52-d429-41a8-89a3-2f7e6d29be2d/-/preview/336x160/',
      medium:
        'https://ucarecdn.com/ae0d4df7-3a0c-45c7-9074-9bb56ab035ab/-/preview/1000x450/',
    },
  },
  {
    title: 'Sportage',
    electric: false,
    images: {
      small:
        'https://ucarecdn.com/719c6d52-d429-41a8-89a3-2f7e6d29be2d/-/preview/336x160/',
      medium:
        'https://ucarecdn.com/ae0d4df7-3a0c-45c7-9074-9bb56ab035ab/-/preview/1000x450/',
    },
  },
])

const _courses = ref([
  {
    title:
      'Kia SONET компактный кроссовер в Узбекистане | обзор и характеристики',
    thumbnail:
      'https://ucarecdn.com/2975e873-cc3b-4721-9054-f52e08f16182/-/preview/999x765/',
    video_url: '',
  },
  {
    title: 'Kia Sonet: Обзор и характеристики',
    thumbnail:
      'https://ucarecdn.com/8f4d9932-621d-416c-a559-5e82970b7543/-/preview/999x765/',
    video_url: '',
  },
  {
    title: 'Kia EV9 в Узбекистане | обзор и характеристики',
    thumbnail:
      'https://ucarecdn.com/dd824708-86b4-4733-9e35-72e11d3de0cb/-/preview/999x765/',
    video_url: '',
  },
  {
    title: 'Обзор на Kia EV6',
    thumbnail:
      'https://ucarecdn.com/aed0992a-585e-4efb-8128-0e2e17326a7b/-/preview/999x765/',
    video_url: '',
  },
  {
    title:
      'Kia SONET компактный кроссовер в Узбекистане | обзор и характеристики',
    thumbnail:
      'https://ucarecdn.com/2975e873-cc3b-4721-9054-f52e08f16182/-/preview/999x765/',
    video_url: '',
  },
  {
    title: 'Kia Sonet: Обзор и характеристики',
    thumbnail:
      'https://ucarecdn.com/8f4d9932-621d-416c-a559-5e82970b7543/-/preview/999x765/',
    video_url: '',
  },
  {
    title: 'Kia EV9 в Узбекистане | обзор и характеристики',
    thumbnail:
      'https://ucarecdn.com/dd824708-86b4-4733-9e35-72e11d3de0cb/-/preview/999x765/',
    video_url: '',
  },
  {
    title: 'Обзор на Kia EV6',
    thumbnail:
      'https://ucarecdn.com/aed0992a-585e-4efb-8128-0e2e17326a7b/-/preview/999x765/',
    video_url: '',
  },
])

type BriefSection = {
  type: 'triple' | 'double'
  direction?: 'left' | 'center'
  title: string
  subtitle?: string
  description: string
  images?: Partial<
    Record<
      'lg' | 'md' | 'default',
      {
        src: string
        alt?: string
      }
    >
  >
  meta?: any
}

const _sections = ref<BriefSection[]>([
  {
    type: 'triple',
    title: 'Новый Kia Carnival',
    description:
      'Новый дизайн добавляет семейному кроссвэну изысканность, роскошный интерьер обеспечивает комфорт, отличная управляемость гарантирует уверенность на любой дороге.',
    images: {
      default: {
        src: 'https://ucarecdn.com/4fb8d4c8-b54d-48d3-8be5-3400607b0b07/',
        alt: 'Новый Kia Carnival',
      },
      lg: {
        src: 'https://ucarecdn.com/73d16266-6456-45e2-a2e9-9692083daba0/-/preview/1060x550/',
        alt: 'Новый Kia Carnival',
      },
    },
  },
  {
    type: 'double',
    title: 'Внешний вид',
    subtitle: 'Экстерьер',
    description:
      'Изысканный и утонченный дизайн нового Kia Carnival отражается в каждой детали, придавая семейному кроссвэну неповторимый стиль, который гармонично будет сочетаться с вашим образом жизни.',
    meta: {
      slides: [
        {
          label: 'Спортивный силуэт',
          image: 'https://ucarecdn.com/cf373707-f5c0-4856-b2d1-cb07c0fa4cbb/',
          description: 'lorem ipsum dolor sit amet',
        },
        {
          label: 'Проекционные светодиодные фары',
          image: 'https://ucarecdn.com/cf373707-f5c0-4856-b2d1-cb07c0fa4cbb/',
          description: 'lorem ipsum dolor sit amet',
        },
        {
          label: 'Светодиодные задние фонари',
          image: 'https://ucarecdn.com/cf373707-f5c0-4856-b2d1-cb07c0fa4cbb/',
          description: 'lorem ipsum dolor sit amet',
        },
        {
          label: '19-дюймовые легкосплавные диски с механической обработкой',
          image: 'https://ucarecdn.com/cf373707-f5c0-4856-b2d1-cb07c0fa4cbb/',
          description: 'lorem ipsum dolor sit amet',
        },
      ],
    },
  },

  {
    type: 'triple',
    title: 'Интерьер',
    description:
      'Современный и стильный интерьер, органично дополненный панорамным изогнутым монитором, отличается элегантностью, удобством и функциональностью планировки.',
    images: {
      default: {
        src: 'https://ucarecdn.com/d130551a-6373-41ac-9c01-0652a3caa014/',
      },
      lg: {
        src: 'https://ucarecdn.com/4bb0945f-9761-4f27-bfb0-811d7fec606b/-/preview/1060x550/',
      },
    },
  },

  {
    direction: 'left',
    type: 'double',
    title: 'Комфортное пространство',
    subtitle: 'Комфорт',
    description:
      'Интерьер нового Kia Carnival отличает не только премиальный уровень комфорта, но и особое внимание к каждой детали. Поддержка работы цифровых устройств и современный интерфейс позволят идти в ногу со временем. Удобная информационно-развлекательная система наполнит радостью и удовольствием каждое мгновение, проведенное с семьей в совместных поездках.',
    meta: {
      slides: [
        {
          label: 'Цифровое центральное зеркало (DCM)',
          image:
            'https://ucarecdn.com/0c815b00-b55b-4e56-8c31-0ba0734d4cb0/-/preview/620x620/',
          description: 'lorem ipsum dolor sit amet',
        },
        {
          label: 'Кресло водителя Ergo motion',
          image:
            'https://ucarecdn.com/0c815b00-b55b-4e56-8c31-0ba0734d4cb0/-/preview/620x620/',
          description: 'lorem ipsum dolor sit amet',
        },
        {
          label: 'Сиденья 2-го ряда с функцией релаксации',
          image:
            'https://ucarecdn.com/0c815b00-b55b-4e56-8c31-0ba0734d4cb0/-/preview/620x620/',
          description: 'lorem ipsum dolor sit amet',
        },
        {
          label: 'Атмосферная подсветка салона',
          image: 'https://ucarecdn.com/0c815b00-b55b-4e56-8c31-0ba0734d4cb0/',
          description: 'lorem ipsum dolor sit amet',
        },
      ],
    },
  },
  {
    type: 'double',
    title: 'Современные технологии',
    subtitle: 'Технологии',
    description:
      'Передовое оснащение делает управление новым Kia Carnival незабываемым. В любом месте и в любой ситуации вы сможете прочувствовать бескомпромиссный комфорт и уверенность за рулем благодаря усовершенствованным инновационными решениям.',
    meta: {
      slides: [
        {
          label: 'Проекционный дисплей',
          image: 'https://ucarecdn.com/7d6bce9e-3286-4fb9-9d5c-3c2fd71e8cb5/',
          description: `11-дюймовый проекционный дисплей высокой
четкости отображает ключевую информацию
о поездке, считывая данные с приборов
и навигационной системы. Вы сможете узнать
скорость движения, запас хода и данные круиз-контроля, не отвлекаясь от дороги.`,
        },
        {
          label: 'Камера кругового обзора',
          image: 'https://ucarecdn.com/7d6bce9e-3286-4fb9-9d5c-3c2fd71e8cb5/',
          description: 'lorem ipsum dolor sit amet',
        },
      ],
    },
  },
  {
    type: 'double',
    direction: 'left',
    title: 'Современные системы помощи водителю',
    subtitle: 'Помощь водителю',
    description:
      'Усовершенствованные системы помощи водителю легко адаптируются к различным дорожным ситуациям, обеспечивая еще более высокий уровень комфорта и безопасности. Передовые технологии снимают даже малейший дискомфорт при вождении, помогая расслабиться и получить истинное удовольствие от управления кроссвэном премиум-класса.',
    meta: {
      slides: [
        {
          label:
            'Система предотвращения столкновения при выезде с парковки задним ходом (PCA)',
          image: 'https://ucarecdn.com/10f563ab-ccc9-421a-8f89-f3bd60b98a3f/',
          description: `Если при движении задним ходом возникает опасность столкновения с объектом или пешеходом позади вас, система сигнализирует, включая предупреждение.
Если риск столкновения возрастает даже после предупреждения, система задействует экстренное торможение для предотвращения столкновения.`,
        },
        {
          label: 'Ассистент управления дальним светом (HBA)',
          image: 'https://ucarecdn.com/10f563ab-ccc9-421a-8f89-f3bd60b98a3f/',
          description: 'lorem ipsum dolor sit amet',
        },
        {
          label:
            'Система предотвращения бокового столкновения при выезде с парковки задним ходом (RCCA)',
          image: 'https://ucarecdn.com/10f563ab-ccc9-421a-8f89-f3bd60b98a3f/',
          description: 'lorem ipsum dolor sit amet',
        },
        {
          label: 'Система предотвращения фронтального столкновения (FCA)',
          image: 'https://ucarecdn.com/10f563ab-ccc9-421a-8f89-f3bd60b98a3f/',
          description: 'lorem ipsum dolor sit amet',
        },
        {
          label: 'Датчики парковки',
          image: 'https://ucarecdn.com/10f563ab-ccc9-421a-8f89-f3bd60b98a3f/',
          description: 'lorem ipsum dolor sit amet',
        },
        {
          label: 'Ассистент движения в полосе (LFA)',
          image: 'https://ucarecdn.com/10f563ab-ccc9-421a-8f89-f3bd60b98a3f/',
          description: 'lorem ipsum dolor sit amet',
        },
      ],
    },
  },
  {
    type: 'triple',
    title: 'Система пассивной безопасности',
    description:
      'Автомобиль оборудован передними, центральными и боковыми подушками безопасности. Расширенные подушки защищают водителя и пассажиров на передних сиденьях, центральная боковая подушка безопасности первого ряда предотвращает столкновение между пассажирами, а шторные подушки безопасности чувствительны к опрокидыванию. Отдельная подушка предназначена для коленей водителя. В общей сложности салон Kia Carnival оборудован восемью подушками безопасности, которые обеспечивают дополнительную защиту водителя и пассажиров.',
    images: {
      default: {
        src: 'https://ucarecdn.com/485db143-3963-4e6c-ab7a-878e198953c1/',
      },
    },
  },
  {
    type: 'double',
    title: 'Ощутимая мощность',
    subtitle: 'Двигатель',
    direction: 'left',
    description: `
          Инновационные бензиновый и дизельный двигатели Kia Carnival производят
          меньше шума и обеспечивают значительную экономию топлива за счет
          эффективного охлаждения и пониженного трения. В паре с 8-ступенчатой
          автоматической трансмиссией, отличающейся плавным и уверенным
          переключением передач и увеличенным рабочим диапазоном, вы получаете
          идеальный баланс мощности и экономичности.
        `,
    meta: {
      tabs: [
        {
          title: '3.5 MPI, бензин',
          items: [
            {
              label: 'Мощность двигателя',
              count: { number: 1, unit: 'л. с.' },
            },

            {
              label: 'Крутящий момент',
              count: { number: 249, unit: 'Н·м' },
            },

            {
              label:
                'Разгон от 0 до 100 км/ч с (минимальным значением для данного двигателя)',
              count: { number: 249, unit: 'с' },
            },
          ],
        },
        {
          title: '2.2 Smartstream CRDI, дизель',
          items: [
            {
              label: 'Мощность двигателя',
              count: { number: 331, unit: 'л. с.' },
            },

            {
              label: 'Крутящий момент',
              count: { number: 249, unit: 'Н·м' },
            },

            {
              label:
                'Разгон от 0 до 100 км/ч с (минимальным значением для данного двигателя)',
              count: { number: 249, unit: 'с' },
            },
          ],
        },
      ],
    },
  },
])

const is = (type: 'triple' | 'double', section: BriefSection) => {
  return type === section.type
}

const getCourses = computed(() => _courses.value)
const getSpecials = computed(() => _specials.value)
const getModels = computed(() => _models.value)
const getSections = computed(() => _sections.value)

export const useStore = () => {
  return {
    specials: getSpecials,
    models: getModels,
    courses: getCourses,
    sections: getSections,
  }
}
