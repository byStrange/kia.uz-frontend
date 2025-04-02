import { useFetchApi } from "~/composables/useFetchApi"

export type SearchResultItem = {
  result_type: "model" | "news" | "special_offer",
  id: number,
  master_id: uuid,
  slug: string,
  title: string,
  similarity: number
  preview?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const locale = getCookie(event, 'i18n_redirected')
  const result = await useFetchApi<SearchResultItem[]>(`/search/?q=${body.term}`, locale)
  return result;
})
