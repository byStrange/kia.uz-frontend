import { useFetchApi } from "~/composables/useFetchApi"
import { groupModelsByCategory } from "~/utils/serverUtils"
import type { Model } from "./[id]/index.get"

export default defineEventHandler(async (event) => {
  const locale = getCookie(event, 'i18n_redirected')
  const models = await useFetchApi<Model[]>('/models', locale)
  const groupedModels = groupModelsByCategory(models)

  return { groupedModels }
})
