import { computed, ref } from "vue";

const _specials = ref([
  {
    title: "Kia лизинг",
    thumbnail:
      "https://ucarecdn.com/735c8746-b7a4-4074-96d3-f6345fccad98/-/preview/999x765/",
    description: "Выгодные условия лизинга с предоплатой от 20%",
    href: "#",
  },

  {
    title: "Выгода до 94 880 000 сум: Sorento, K8, Cerato, Seltos и Bongo",
    thumbnail:
      "https://ucarecdn.com/919c823a-2295-48ef-9ee4-f4468f22b43d/-/preview/999x765/",
    description: "Предложение действует до 31/10/2024",
    href: "#",
  },
  {
    title: "Специальные условия кредитования от Asakabank",
    thumbnail:
      "https://ucarecdn.com/e9cee8db-9d53-42ef-ab09-c9160edb8e44/-/preview/999x765/",
    description: "Льготный кредит от 14% годовых",
    href: "#",
  },
  {
    title: "Специальные условия кредитования от Davr Bank",
    thumbnail:
      "https://ucarecdn.com/9c56de1c-c413-435b-a7f4-2467ef8a0dac/-/preview/999x765/",
    href: "#",
    description: "Первоначальный взнос от 25%",
  },
  {
    title: "Kia лизинг",
    thumbnail:
      "https://ucarecdn.com/735c8746-b7a4-4074-96d3-f6345fccad98/-/preview/999x765/",
    description: "Выгодные условия лизинга с предоплатой от 20%",
    href: "#",
  },

  {
    title: "Выгода до 94 880 000 сум: Sorento, K8, Cerato, Seltos и Bongo",
    thumbnail:
      "https://ucarecdn.com/919c823a-2295-48ef-9ee4-f4468f22b43d/-/preview/999x765/",
    description: "Предложение действует до 31/10/2024",
    href: "#",
  },
  {
    title: "Специальные условия кредитования от Asakabank",
    thumbnail:
      "https://ucarecdn.com/e9cee8db-9d53-42ef-ab09-c9160edb8e44/-/preview/999x765/",
    description: "Льготный кредит от 14% годовых",
    href: "#",
  },
  {
    title: "Специальные условия кредитования от Davr Bank",
    thumbnail:
      "https://ucarecdn.com/9c56de1c-c413-435b-a7f4-2467ef8a0dac/-/preview/999x765/",
    href: "#",
    description: "Первоначальный взнос от 25%",
  },
]);

const getSpecials = computed(() => _specials.value);

export const useSpecialsService = () => {
  return {
    specials: getSpecials,
  };
};
