import { useFetchApi } from "~/composables/useFetchApi"

export default defineEventHandler(async (event) => {
  const locale = getQuery(event).lang as string
  const id = getRouterParam(event, 'id')
  const model = await useFetchApi<ModelWithLessData>(`/models/${id}/?fields=name,id,category,main_image,starting_price,slug&test_drive_available=true`, locale)

  return { model }
})
