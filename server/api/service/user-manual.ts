import type { Model } from "../models/[id]/index.get"
import { useFetchApi } from "~/composables/useFetchApi"
import { emptySeo } from "~/utils/serverUtils"

export default defineEventHandler(async (event) => {

  const locale = getQuery(event).lang as string

  const models = await useFetchApi<Model[]>('/models', locale)
  let seo: SEO;

  try {
    seo = await useFetchApi<SEO>('/pages/~service~user-manual', locale)
  }
  catch {
    seo = emptySeo
  }

  const hasUserManual = models.filter((model) => model.user_manual);

  return { models: hasUserManual, seo: seo['seo'] }
})
