import type { Model } from "../models/[id]/index.get"
import { useFetchApi } from "~/composables/useFetchApi"

export default defineEventHandler(async (event) => {
  const locale = getCookie(event, 'i18n_redirected')

  const models = await useFetchApi<Model[]>('/models', locale)
  const hasUserManual = models.filter((model) => model.user_manual);
  console.log(hasUserManual)

  return { models: hasUserManual }
})
