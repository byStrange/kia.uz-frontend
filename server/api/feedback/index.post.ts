import type { z } from "zod";
import { useFetchApi } from "~/composables/useFetchApi";

type FeedbackForm = z.infer<typeof feedbackSchema>

interface FeedbackAPIForm {
  first_name: string
  phone_number: string
  city: string
  comment?: string, is_excursion: boolean
}

export default defineEventHandler(async (event) => {
  const body = await readBody<FeedbackForm>(event)

  const locale = getQuery(event).lang as string
  const isExcursion = getQuery(event)?.excursion as boolean

  const data: FeedbackAPIForm = {
    first_name: body.name || '',
    phone_number: body.phone || '',
    city: body.city,
    comment: body.comment || '',
    is_excursion: isExcursion
  }

  const response = useFetchApi('/feedback/', locale, { method: 'post', body: JSON.stringify(data) })
  return response
}) 
