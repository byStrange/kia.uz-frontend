import { useFetchApi } from "~/composables/useFetchApi"
import { groupModelsByCategory, emptySeo } from "~/utils/serverUtils"
import { modelLessData } from '~/types/server'

export default defineEventHandler(async (event) => {
  const locale = getQuery(event).lang as string
  const models = await useFetchApi<ModelWithLessData[]>(`/models?fields=${modelLessData.join(',')}`, locale)

  let seo: SEO;

  try {
    seo = await useFetchApi<SEO>('/pages/~models', locale)
  }
  catch {
    seo = emptySeo
  }


  const groupedModels = groupModelsByCategory(models.filter(m => m))

  return { groupedModels, models, seo: seo['seo'] }
})
