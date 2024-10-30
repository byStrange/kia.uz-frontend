import { ref, computed } from "vue";

const _i18n = ref<any | null>(null);

const setI18n = (newI18n: any) => {
  _i18n.value = newI18n;
};

const i18n = computed(() => {
  return _i18n.value;
});

export function useI18n() {
  return {
    i18n,
    setI18n,
  };
}
