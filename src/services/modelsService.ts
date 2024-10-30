import { ref } from 'vue';

export type Model = {
  title: string;
  electric: boolean;
  images: {
    small: string;
    medium: string;
  };
};

const models = ref<Model[]>([
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
]);

export const useModelsService = () => {
  return {
    models,
  };
};
