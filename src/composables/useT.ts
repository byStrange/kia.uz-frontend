import { useI18n } from "@/composables/useI18n";

const { i18n } = useI18n();

export function useT($t?: any) {
  if (!$t) {
    $t = i18n.value ? i18n.value.t : null;
  }

  function t(category: string, key: string, params?: object) {
    return $t(category + "." + key, params);
  }

  return { T: t };
}
