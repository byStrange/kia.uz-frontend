import { useFetchApi } from "~/composables/useFetchApi"
import { groupModelsByCategory, emptySeo } from "~/utils/serverUtils"
import type { Model } from "./models/[id]/index.get"

export default defineEventHandler(async (event) => {
  const locale = getCookie(event, 'i18n_redirected')
  const models = await useFetchApi<Model[]>('/models', locale)


  let seo: SEO;

  try {
    seo = await useFetchApi<SEO>('/pages/~models', locale)
  }
  catch {
    seo = emptySeo
  }


  const groupedModels = groupModelsByCategory(models)

  return { groupedModels, models, seo: seo['seo'] }
})
