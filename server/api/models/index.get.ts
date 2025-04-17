import { useFetchApi } from "~/composables/useFetchApi"
import { groupModelsByCategory, emptySeo } from "~/utils/serverUtils"

export default defineEventHandler(async (event) => {
  const locale = getQuery(event).lang as string
  const models = await useFetchApi<ModelWithLessData[]>('/models?fields=name,id,category,main_image,starting_price,slug,old_price,is_electric', locale)


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
