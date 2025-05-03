import type { z } from "zod";

type FeedbackForm = z.infer<typeof feedbackSchema>

interface FeedbackAPIForm {
  first_name: string
  phone_number: string
  city: string
  comment?: string, is_excursion: boolean
}

export default defineEventHandler(async (event) => {
  const body = await readBody<FeedbackForm>(event)

  const isExcursion = getQuery(event)?.excursion as boolean

  const data: FeedbackAPIForm = {
    first_name: body.name || '',
    phone_number: body.phone || '',
    city: body.city,
    comment: body.comment || '',
    is_excursion: isExcursion
  }

  const response = await $fetch('http://83.69.136.36:5409/api/feedback/', { method: 'post', body: JSON.stringify(data) })
  return response
}) 
