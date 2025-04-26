import type { z } from "zod";
import { useFetchApi } from "~/composables/useFetchApi";

type FeedbackForm = z.infer<typeof feedbackSchema>

interface FeedbackAPIForm {
  first_name: string
  last_name: string
  phone_number: string
  email: string
  city: string
  comment: string
  type: uuid
}

export default defineEventHandler(async (event) => {
  const body = await readBody<FeedbackForm>(event)

  const locale = getQuery(event).lang as string

  const data: FeedbackAPIForm = {
    first_name: body.name || '',
    last_name: body.surname || '',
    phone_number: body.phone || '',
    email: body.email,
    city: body.city,
    comment: body.comment,
    type: body.feedbackType
  }

  const response = useFetchApi('/feedback/', locale, { method: 'post', body: JSON.stringify(data) })
  return response
}) 
