import { useFetchApi } from "~/composables/useFetchApi"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const locale = getCookie(event, 'i18_redirected')
  const offer = await useFetchApi(`/special-offers/${id}`, locale)
  console.log(offer)
  return offer;
})
