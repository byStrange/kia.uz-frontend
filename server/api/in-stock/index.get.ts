import { useFetchApi } from "~/composables/useFetchApi"
import { groupModelsFullByCategory, emptySeo } from "~/utils/serverUtils"
import { toQuery } from "~/utils"
import type { Model } from "../models/[id]/index.get"
import type { ModelFilters } from "~/components/organisms/InStockFilter.vue"

export default defineEventHandler(async (event) => {
  const locale = getQuery(event).lang as string

  const query = getQuery<Partial<ModelFilters>>(event)

  const q = toQuery(query, { 'isNew': 'is_new', 'bodyType': 'body_type', 'driveType': 'actuation', 'engineType': 'engine_fuel_type' });

  const models = await useFetchApi<Model[]>(`/models${q}`, locale)

  let seo: SEO;

  try {
    seo = await useFetchApi<SEO>('/pages/~models', locale)
  }
  catch {
    seo = emptySeo
  }


  const groupedModels = groupModelsFullByCategory(models)

  return { groupedModels, models, seo: seo['seo'] }
})
