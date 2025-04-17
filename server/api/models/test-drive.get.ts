import { useFetchApi } from "~/composables/useFetchApi"
import { groupModelsByCategory } from "~/utils/serverUtils"

export default defineEventHandler(async (event) => {

  const locale = getQuery(event).lang as string

  const models = await useFetchApi<ModelWithLessData[]>('/models?fields=name,id,category,main_image,starting_price,slug&test_drive_available=true', locale)

  const groupedModels = groupModelsByCategory(models)

  let seo: SEO;

  try {
    seo = await useFetchApi<SEO>('/pages/~models~test-drive', locale)
  }
  catch {
    seo = emptySeo
  }

  return { groupedModels, seo: seo['seo'] }
})
