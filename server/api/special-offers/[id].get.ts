import { useFetchApi } from "~/composables/useFetchApi"


export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const locale = getCookie(event, 'i18n_redirected')
  const offer = await useFetchApi<SpecialOffer>(`/special-offers/${id}`, locale)
  return offer;
})
