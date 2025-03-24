import { useFetchApi } from "~/composables/useFetchApi"
import type { Model } from "../models/[id]/index.get"
import { emptySeo } from "~/utils/serverUtils"
import type { Dealer } from "../dealers.get"

export default defineEventHandler(async (event) => {
  const locale = getCookie(event, 'i18n_redirected')
  const models = await useFetchApi<Pick<Model, 'id' | 'name'>[]>('/models?fields=name,id')
  const dealers = await useFetchApi<Dealer[]>('/dealers')

  let seo: SEO;

  try {
    seo = await useFetchApi<SEO>('/pages/~service', locale)
  }
  catch {
    seo = emptySeo
  }


  return { seo: seo['seo'], models, dealers }
})
