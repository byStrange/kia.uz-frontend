import { useFetchApi } from "~/composables/useFetchApi"
import { groupModelsByCategory } from "~/utils/serverUtils"

export default defineEventHandler(async (event) => {
  const locale = getCookie(event, 'i18n_redirected')
  const models = await useFetchApi<ModelWithLessData[]>('/models?fields=name,id,category,main_image,starting_price,slug&test_drive_available=true', locale)
  const groupedModels = groupModelsByCategory(models)

  return { groupedModels }
})
