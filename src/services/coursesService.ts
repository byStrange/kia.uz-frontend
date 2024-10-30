import { computed, ref } from 'vue';

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
]);

const getCourses = computed(() => _courses.value);

export const useCoursesService = () => {
  return {
    courses: getCourses,
  };
};
