import { NuxtModule, RuntimeConfig } from '@nuxt/schema'
declare module '@nuxt/schema' {
  interface NuxtOptions {
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/tailwindcss`
     */
    ["tailwindcss"]: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@pinia/nuxt`
     */
    ["pinia"]: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@vueuse/nuxt`
     */
    ["vueuse"]: typeof import("@vueuse/nuxt").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/eslint`
     */
    ["eslint"]: typeof import("@nuxt/eslint").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-site-config@2.2.21_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._dfe62jjz2hbvqhty2rsh4hrdbi/node_modules/nuxt-site-config/dist/module`
     */
    ["site"]: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-site-config@2.2.21_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._dfe62jjz2hbvqhty2rsh4hrdbi/node_modules/nuxt-site-config/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+robots@4.1.11_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_dz5z2wmebscxbm5oa3cmiytvhm/node_modules/@nuxtjs/robots/dist/module`
     */
    ["robots"]: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+robots@4.1.11_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_dz5z2wmebscxbm5oa3cmiytvhm/node_modules/@nuxtjs/robots/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.13.0_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_t_773wmu3cukimatof5gt2c7xx24/node_modules/@nuxtjs/sitemap/dist/module`
     */
    ["sitemap"]: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.13.0_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_t_773wmu3cukimatof5gt2c7xx24/node_modules/@nuxtjs/sitemap/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-og-image@3.0.8_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36.0_zs3lf7utu4nk7htfimc536hosa/node_modules/nuxt-og-image/dist/module`
     */
    ["ogImage"]: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-og-image@3.0.8_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36.0_zs3lf7utu4nk7htfimc536hosa/node_modules/nuxt-og-image/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-schema-org@3.4.2_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_yexp425e367c6m72psoribrspa/node_modules/nuxt-schema-org/dist/module`
     */
    ["schemaOrg"]: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-schema-org@3.4.2_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_yexp425e367c6m72psoribrspa/node_modules/nuxt-schema-org/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser_5rj7kvbgykbfm6dlje3tosmjt4/node_modules/nuxt-seo-experiments/dist/module`
     */
    ["seoExperiments"]: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser_5rj7kvbgykbfm6dlje3tosmjt4/node_modules/nuxt-seo-experiments/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-link-checker@3.1.3_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._xqnrz2z2w4hsfhfo67oha72zkq/node_modules/nuxt-link-checker/dist/module`
     */
    ["linkChecker"]: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-link-checker@3.1.3_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._xqnrz2z2w4hsfhfo67oha72zkq/node_modules/nuxt-link-checker/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/seo`
     */
    ["seo"]: typeof import("@nuxtjs/seo").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@primevue/nuxt-module`
     */
    ["primevue"]: typeof import("@primevue/nuxt-module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `nuxt-swiper`
     */
    ["swiper"]: typeof import("nuxt-swiper").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxthub/core`
     */
    ["hub"]: typeof import("@nuxthub/core").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O : Record<string, any>
  }
  interface NuxtConfig {
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/tailwindcss`
     */
    ["tailwindcss"]?: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@pinia/nuxt`
     */
    ["pinia"]?: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@vueuse/nuxt`
     */
    ["vueuse"]?: typeof import("@vueuse/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/eslint`
     */
    ["eslint"]?: typeof import("@nuxt/eslint").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-site-config@2.2.21_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._dfe62jjz2hbvqhty2rsh4hrdbi/node_modules/nuxt-site-config/dist/module`
     */
    ["site"]?: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-site-config@2.2.21_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._dfe62jjz2hbvqhty2rsh4hrdbi/node_modules/nuxt-site-config/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+robots@4.1.11_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_dz5z2wmebscxbm5oa3cmiytvhm/node_modules/@nuxtjs/robots/dist/module`
     */
    ["robots"]?: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+robots@4.1.11_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_dz5z2wmebscxbm5oa3cmiytvhm/node_modules/@nuxtjs/robots/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.13.0_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_t_773wmu3cukimatof5gt2c7xx24/node_modules/@nuxtjs/sitemap/dist/module`
     */
    ["sitemap"]?: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.13.0_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_t_773wmu3cukimatof5gt2c7xx24/node_modules/@nuxtjs/sitemap/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-og-image@3.0.8_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36.0_zs3lf7utu4nk7htfimc536hosa/node_modules/nuxt-og-image/dist/module`
     */
    ["ogImage"]?: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-og-image@3.0.8_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36.0_zs3lf7utu4nk7htfimc536hosa/node_modules/nuxt-og-image/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-schema-org@3.4.2_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_yexp425e367c6m72psoribrspa/node_modules/nuxt-schema-org/dist/module`
     */
    ["schemaOrg"]?: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-schema-org@3.4.2_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_yexp425e367c6m72psoribrspa/node_modules/nuxt-schema-org/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser_5rj7kvbgykbfm6dlje3tosmjt4/node_modules/nuxt-seo-experiments/dist/module`
     */
    ["seoExperiments"]?: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser_5rj7kvbgykbfm6dlje3tosmjt4/node_modules/nuxt-seo-experiments/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-link-checker@3.1.3_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._xqnrz2z2w4hsfhfo67oha72zkq/node_modules/nuxt-link-checker/dist/module`
     */
    ["linkChecker"]?: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-link-checker@3.1.3_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._xqnrz2z2w4hsfhfo67oha72zkq/node_modules/nuxt-link-checker/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/seo`
     */
    ["seo"]?: typeof import("@nuxtjs/seo").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@primevue/nuxt-module`
     */
    ["primevue"]?: typeof import("@primevue/nuxt-module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `nuxt-swiper`
     */
    ["swiper"]?: typeof import("nuxt-swiper").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxthub/core`
     */
    ["hub"]?: typeof import("@nuxthub/core").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxtjs/tailwindcss", Exclude<NuxtConfig["tailwindcss"], boolean>] | ["@pinia/nuxt", Exclude<NuxtConfig["pinia"], boolean>] | ["@vueuse/nuxt", Exclude<NuxtConfig["vueuse"], boolean>] | ["@nuxt/eslint", Exclude<NuxtConfig["eslint"], boolean>] | ["/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-site-config@2.2.21_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._dfe62jjz2hbvqhty2rsh4hrdbi/node_modules/nuxt-site-config/dist/module", Exclude<NuxtConfig["site"], boolean>] | ["/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+robots@4.1.11_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_dz5z2wmebscxbm5oa3cmiytvhm/node_modules/@nuxtjs/robots/dist/module", Exclude<NuxtConfig["robots"], boolean>] | ["/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.13.0_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_t_773wmu3cukimatof5gt2c7xx24/node_modules/@nuxtjs/sitemap/dist/module", Exclude<NuxtConfig["sitemap"], boolean>] | ["/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-og-image@3.0.8_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36.0_zs3lf7utu4nk7htfimc536hosa/node_modules/nuxt-og-image/dist/module", Exclude<NuxtConfig["ogImage"], boolean>] | ["/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-schema-org@3.4.2_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_yexp425e367c6m72psoribrspa/node_modules/nuxt-schema-org/dist/module", Exclude<NuxtConfig["schemaOrg"], boolean>] | ["/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser_5rj7kvbgykbfm6dlje3tosmjt4/node_modules/nuxt-seo-experiments/dist/module", Exclude<NuxtConfig["seoExperiments"], boolean>] | ["/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-link-checker@3.1.3_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._xqnrz2z2w4hsfhfo67oha72zkq/node_modules/nuxt-link-checker/dist/module", Exclude<NuxtConfig["linkChecker"], boolean>] | ["@nuxtjs/seo", Exclude<NuxtConfig["seo"], boolean>] | ["@primevue/nuxt-module", Exclude<NuxtConfig["primevue"], boolean>] | ["nuxt-swiper", Exclude<NuxtConfig["swiper"], boolean>] | ["@nuxthub/core", Exclude<NuxtConfig["hub"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
}
declare module 'nuxt/schema' {
  interface NuxtOptions {
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/tailwindcss`
     * @see https://www.npmjs.com/package/@nuxtjs/tailwindcss
     */
    ["tailwindcss"]: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@pinia/nuxt`
     * @see https://www.npmjs.com/package/@pinia/nuxt
     */
    ["pinia"]: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@vueuse/nuxt`
     * @see https://www.npmjs.com/package/@vueuse/nuxt
     */
    ["vueuse"]: typeof import("@vueuse/nuxt").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/eslint`
     * @see https://www.npmjs.com/package/@nuxt/eslint
     */
    ["eslint"]: typeof import("@nuxt/eslint").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-site-config@2.2.21_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._dfe62jjz2hbvqhty2rsh4hrdbi/node_modules/nuxt-site-config/dist/module`
     * @see https://www.npmjs.com/package//home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-site-config@2.2.21_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._dfe62jjz2hbvqhty2rsh4hrdbi/node_modules/nuxt-site-config/dist/module
     */
    ["site"]: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-site-config@2.2.21_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._dfe62jjz2hbvqhty2rsh4hrdbi/node_modules/nuxt-site-config/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+robots@4.1.11_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_dz5z2wmebscxbm5oa3cmiytvhm/node_modules/@nuxtjs/robots/dist/module`
     * @see https://www.npmjs.com/package//home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+robots@4.1.11_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_dz5z2wmebscxbm5oa3cmiytvhm/node_modules/@nuxtjs/robots/dist/module
     */
    ["robots"]: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+robots@4.1.11_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_dz5z2wmebscxbm5oa3cmiytvhm/node_modules/@nuxtjs/robots/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.13.0_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_t_773wmu3cukimatof5gt2c7xx24/node_modules/@nuxtjs/sitemap/dist/module`
     * @see https://www.npmjs.com/package//home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.13.0_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_t_773wmu3cukimatof5gt2c7xx24/node_modules/@nuxtjs/sitemap/dist/module
     */
    ["sitemap"]: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.13.0_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_t_773wmu3cukimatof5gt2c7xx24/node_modules/@nuxtjs/sitemap/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-og-image@3.0.8_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36.0_zs3lf7utu4nk7htfimc536hosa/node_modules/nuxt-og-image/dist/module`
     * @see https://www.npmjs.com/package//home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-og-image@3.0.8_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36.0_zs3lf7utu4nk7htfimc536hosa/node_modules/nuxt-og-image/dist/module
     */
    ["ogImage"]: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-og-image@3.0.8_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36.0_zs3lf7utu4nk7htfimc536hosa/node_modules/nuxt-og-image/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-schema-org@3.4.2_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_yexp425e367c6m72psoribrspa/node_modules/nuxt-schema-org/dist/module`
     * @see https://www.npmjs.com/package//home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-schema-org@3.4.2_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_yexp425e367c6m72psoribrspa/node_modules/nuxt-schema-org/dist/module
     */
    ["schemaOrg"]: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-schema-org@3.4.2_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_yexp425e367c6m72psoribrspa/node_modules/nuxt-schema-org/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser_5rj7kvbgykbfm6dlje3tosmjt4/node_modules/nuxt-seo-experiments/dist/module`
     * @see https://www.npmjs.com/package//home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser_5rj7kvbgykbfm6dlje3tosmjt4/node_modules/nuxt-seo-experiments/dist/module
     */
    ["seoExperiments"]: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser_5rj7kvbgykbfm6dlje3tosmjt4/node_modules/nuxt-seo-experiments/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-link-checker@3.1.3_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._xqnrz2z2w4hsfhfo67oha72zkq/node_modules/nuxt-link-checker/dist/module`
     * @see https://www.npmjs.com/package//home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-link-checker@3.1.3_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._xqnrz2z2w4hsfhfo67oha72zkq/node_modules/nuxt-link-checker/dist/module
     */
    ["linkChecker"]: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-link-checker@3.1.3_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._xqnrz2z2w4hsfhfo67oha72zkq/node_modules/nuxt-link-checker/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/seo`
     * @see https://www.npmjs.com/package/@nuxtjs/seo
     */
    ["seo"]: typeof import("@nuxtjs/seo").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@primevue/nuxt-module`
     * @see https://www.npmjs.com/package/@primevue/nuxt-module
     */
    ["primevue"]: typeof import("@primevue/nuxt-module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `nuxt-swiper`
     * @see https://www.npmjs.com/package/nuxt-swiper
     */
    ["swiper"]: typeof import("nuxt-swiper").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxthub/core`
     * @see https://hub.nuxt.com
     */
    ["hub"]: typeof import("@nuxthub/core").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O : Record<string, any>
  }
  interface NuxtConfig {
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/tailwindcss`
     * @see https://www.npmjs.com/package/@nuxtjs/tailwindcss
     */
    ["tailwindcss"]?: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@pinia/nuxt`
     * @see https://www.npmjs.com/package/@pinia/nuxt
     */
    ["pinia"]?: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@vueuse/nuxt`
     * @see https://www.npmjs.com/package/@vueuse/nuxt
     */
    ["vueuse"]?: typeof import("@vueuse/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/eslint`
     * @see https://www.npmjs.com/package/@nuxt/eslint
     */
    ["eslint"]?: typeof import("@nuxt/eslint").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-site-config@2.2.21_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._dfe62jjz2hbvqhty2rsh4hrdbi/node_modules/nuxt-site-config/dist/module`
     * @see https://www.npmjs.com/package//home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-site-config@2.2.21_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._dfe62jjz2hbvqhty2rsh4hrdbi/node_modules/nuxt-site-config/dist/module
     */
    ["site"]?: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-site-config@2.2.21_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._dfe62jjz2hbvqhty2rsh4hrdbi/node_modules/nuxt-site-config/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+robots@4.1.11_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_dz5z2wmebscxbm5oa3cmiytvhm/node_modules/@nuxtjs/robots/dist/module`
     * @see https://www.npmjs.com/package//home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+robots@4.1.11_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_dz5z2wmebscxbm5oa3cmiytvhm/node_modules/@nuxtjs/robots/dist/module
     */
    ["robots"]?: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+robots@4.1.11_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_dz5z2wmebscxbm5oa3cmiytvhm/node_modules/@nuxtjs/robots/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.13.0_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_t_773wmu3cukimatof5gt2c7xx24/node_modules/@nuxtjs/sitemap/dist/module`
     * @see https://www.npmjs.com/package//home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.13.0_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_t_773wmu3cukimatof5gt2c7xx24/node_modules/@nuxtjs/sitemap/dist/module
     */
    ["sitemap"]?: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.13.0_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_t_773wmu3cukimatof5gt2c7xx24/node_modules/@nuxtjs/sitemap/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-og-image@3.0.8_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36.0_zs3lf7utu4nk7htfimc536hosa/node_modules/nuxt-og-image/dist/module`
     * @see https://www.npmjs.com/package//home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-og-image@3.0.8_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36.0_zs3lf7utu4nk7htfimc536hosa/node_modules/nuxt-og-image/dist/module
     */
    ["ogImage"]?: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-og-image@3.0.8_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36.0_zs3lf7utu4nk7htfimc536hosa/node_modules/nuxt-og-image/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-schema-org@3.4.2_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_yexp425e367c6m72psoribrspa/node_modules/nuxt-schema-org/dist/module`
     * @see https://www.npmjs.com/package//home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-schema-org@3.4.2_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_yexp425e367c6m72psoribrspa/node_modules/nuxt-schema-org/dist/module
     */
    ["schemaOrg"]?: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-schema-org@3.4.2_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_yexp425e367c6m72psoribrspa/node_modules/nuxt-schema-org/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser_5rj7kvbgykbfm6dlje3tosmjt4/node_modules/nuxt-seo-experiments/dist/module`
     * @see https://www.npmjs.com/package//home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser_5rj7kvbgykbfm6dlje3tosmjt4/node_modules/nuxt-seo-experiments/dist/module
     */
    ["seoExperiments"]?: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser_5rj7kvbgykbfm6dlje3tosmjt4/node_modules/nuxt-seo-experiments/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-link-checker@3.1.3_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._xqnrz2z2w4hsfhfo67oha72zkq/node_modules/nuxt-link-checker/dist/module`
     * @see https://www.npmjs.com/package//home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-link-checker@3.1.3_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._xqnrz2z2w4hsfhfo67oha72zkq/node_modules/nuxt-link-checker/dist/module
     */
    ["linkChecker"]?: typeof import("/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-link-checker@3.1.3_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._xqnrz2z2w4hsfhfo67oha72zkq/node_modules/nuxt-link-checker/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/seo`
     * @see https://www.npmjs.com/package/@nuxtjs/seo
     */
    ["seo"]?: typeof import("@nuxtjs/seo").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@primevue/nuxt-module`
     * @see https://www.npmjs.com/package/@primevue/nuxt-module
     */
    ["primevue"]?: typeof import("@primevue/nuxt-module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `nuxt-swiper`
     * @see https://www.npmjs.com/package/nuxt-swiper
     */
    ["swiper"]?: typeof import("nuxt-swiper").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxthub/core`
     * @see https://hub.nuxt.com
     */
    ["hub"]?: typeof import("@nuxthub/core").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxtjs/tailwindcss", Exclude<NuxtConfig["tailwindcss"], boolean>] | ["@pinia/nuxt", Exclude<NuxtConfig["pinia"], boolean>] | ["@vueuse/nuxt", Exclude<NuxtConfig["vueuse"], boolean>] | ["@nuxt/eslint", Exclude<NuxtConfig["eslint"], boolean>] | ["/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-site-config@2.2.21_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._dfe62jjz2hbvqhty2rsh4hrdbi/node_modules/nuxt-site-config/dist/module", Exclude<NuxtConfig["site"], boolean>] | ["/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+robots@4.1.11_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_dz5z2wmebscxbm5oa3cmiytvhm/node_modules/@nuxtjs/robots/dist/module", Exclude<NuxtConfig["robots"], boolean>] | ["/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/@nuxtjs+sitemap@6.1.5_h3@1.13.0_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_t_773wmu3cukimatof5gt2c7xx24/node_modules/@nuxtjs/sitemap/dist/module", Exclude<NuxtConfig["sitemap"], boolean>] | ["/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-og-image@3.0.8_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36.0_zs3lf7utu4nk7htfimc536hosa/node_modules/nuxt-og-image/dist/module", Exclude<NuxtConfig["ogImage"], boolean>] | ["/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-schema-org@3.4.2_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5.36_yexp425e367c6m72psoribrspa/node_modules/nuxt-schema-org/dist/module", Exclude<NuxtConfig["schemaOrg"], boolean>] | ["/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-seo-experiments@4.0.1_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser_5rj7kvbgykbfm6dlje3tosmjt4/node_modules/nuxt-seo-experiments/dist/module", Exclude<NuxtConfig["seoExperiments"], boolean>] | ["/home/rakhmatullo/Documents/Github/trigger/kia.uz-frontend/node_modules/.pnpm/nuxt-link-checker@3.1.3_magicast@0.3.5_rollup@4.26.0_vite@5.4.11_@types+node@22.9.0_terser@5._xqnrz2z2w4hsfhfo67oha72zkq/node_modules/nuxt-link-checker/dist/module", Exclude<NuxtConfig["linkChecker"], boolean>] | ["@nuxtjs/seo", Exclude<NuxtConfig["seo"], boolean>] | ["@primevue/nuxt-module", Exclude<NuxtConfig["primevue"], boolean>] | ["nuxt-swiper", Exclude<NuxtConfig["swiper"], boolean>] | ["@nuxthub/core", Exclude<NuxtConfig["hub"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      buildId: string,

      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   nitro: {
      envPrefix: string,
   },

   sitemap: {
      isI18nMapped: boolean,

      sitemapName: string,

      isMultiSitemap: boolean,

      excludeAppSources: Array<any>,

      cacheMaxAgeSeconds: number,

      autoLastmod: boolean,

      defaultSitemapsChunkSize: number,

      minify: boolean,

      sortEntries: boolean,

      debug: boolean,

      discoverImages: boolean,

      discoverVideos: boolean,

      sitemapsPathPrefix: string,

      isNuxtContentDocumentDriven: boolean,

      xsl: string,

      xslTips: boolean,

      xslColumns: Array<{

      }>,

      credits: boolean,

      version: string,

      sitemaps: {
         "sitemap.xml": {
            sitemapName: string,

            route: string,

            defaults: any,

            include: Array<any>,

            exclude: Array<string>,

            includeAppSources: boolean,
         },
      },
   },

   "nuxt-schema-org": {
      reactive: boolean,

      minify: boolean,

      scriptAttributes: {
         id: string,
      },

      identity: any,

      version: string,
   },

   hub: {
      projectUrl: string,

      projectSecretKey: string,

      url: string,

      projectKey: string,

      userToken: string,

      remote: any,

      remoteManifest: any,

      dir: string,

      ai: boolean,

      analytics: boolean,

      blob: boolean,

      browser: boolean,

      cache: boolean,

      database: boolean,

      kv: boolean,

      vectorize: any,

      version: string,

      env: string,

      openapi: boolean,

      bindings: {
         hyperdrive: any,

         compatibilityFlags: any,
      },

      cloudflareAccess: {
         clientId: any,

         clientSecret: any,
      },
   },

   "nuxt-site-config": {
      stack: Array<{

      }>,

      version: string,

      debug: boolean,
   },

   "nuxt-robots": {
      version: string,

      usingNuxtContent: boolean,

      debug: boolean,

      credits: boolean,

      groups: Array<{

      }>,

      sitemap: Array<string>,

      header: boolean,

      robotsEnabledValue: string,

      robotsDisabledValue: string,

      cacheControl: string,
   },

   "nuxt-simple-robots": {
      version: string,

      usingNuxtContent: boolean,

      debug: boolean,

      credits: boolean,

      groups: Array<{

      }>,

      sitemap: Array<string>,

      header: boolean,

      robotsEnabledValue: string,

      robotsDisabledValue: string,

      cacheControl: string,
   },

   "nuxt-og-image": {
      version: string,

      satoriOptions: any,

      resvgOptions: any,

      sharpOptions: any,

      publicStoragePath: string,

      defaults: {
         emojis: string,

         renderer: string,

         component: string,

         extension: string,

         width: number,

         height: number,

         cacheMaxAgeSeconds: number,
      },

      debug: boolean,

      baseCacheKey: string,

      fonts: Array<{

      }>,

      hasNuxtIcon: boolean,

      colorPreference: string,

      isNuxtContentDocumentDriven: boolean,
   },
  }
  interface PublicRuntimeConfig {
   siteName: string,

   siteUrl: string,

   "nuxt-seo": {
      canonicalQueryWhitelist: Array<string>,
   },

   primevue: {
      usePrimeVue: boolean,

      autoImport: boolean,

      resolvePath: any,

      importPT: any,

      importTheme: {
         from: string,
      },

      loadStyles: boolean,

      options: any,

      components: Array<{

      }>,

      directives: Array<{

      }>,

      composables: Array<{

      }>,

      config: Array<{

      }>,

      services: Array<any>,

      styles: Array<{

      }>,

      injectStylesAsString: Array<any>,

      injectStylesAsStringToTop: Array<string>,
   },

   hub: any,
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }