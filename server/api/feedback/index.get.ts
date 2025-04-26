import { useFetchApi } from "~/composables/useFetchApi"

interface FeedbackType extends CommonModel {
  name: string
}

export default defineEventHandler(async (event) => {
  const locale = getQuery(event).lang as string
  const feedbackTypes = await useFetchApi<FeedbackType[]>('/feedback-types', locale)

  return feedbackTypes
})
