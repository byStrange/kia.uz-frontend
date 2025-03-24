import { useFetchApi } from "~/composables/useFetchApi"
import { emptySeo } from "~/utils/serverUtils"

export default defineEventHandler(async (event) => {
  const locale = getCookie(event, 'i18n_redirected')

  let seo: SEO;

  try {
    seo = await useFetchApi<SEO>('/pages/~service~warranty', locale)
  }
  catch {
    seo = emptySeo
  }


  return { seo: seo['seo'] }
})
