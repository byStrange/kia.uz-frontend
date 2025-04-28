import type { z } from "zod";
import { useFetchApi } from "~/composables/useFetchApi";

type RequestServiceForm = z.infer<typeof serviceForm>

interface RequestSerficeAPIForm {
  city: string
  name: string
  phone_number: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<RequestServiceForm>(event)

  const locale = getQuery(event).lang as string

  const data: RequestSerficeAPIForm = {
    city: body.region,
    name: body.name || '',
    phone_number: body.phone
  }

  const response = useFetchApi('/service-request/', locale, { method: 'post', body: JSON.stringify(data) })
  return response
}) 
