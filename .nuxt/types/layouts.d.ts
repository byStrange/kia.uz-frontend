import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "default" | "model-layout"
declare module "../../node_modules/.pnpm/nuxt@3.14.159_@parcel+watcher@2.5.0_@types+node@22.9.0_encoding@0.1.13_eslint@9.14.0_jiti@2.4_jmep7dkl7iioarqxya6vnjvzmm/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}