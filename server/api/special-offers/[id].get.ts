import { useFetchApi } from "~/composables/useFetchApi"


export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const locale = getQuery(event).lang as string

  const offer = await useFetchApi<SpecialOffer>(`/special-offers/${id}`, locale)
  return offer;
})
