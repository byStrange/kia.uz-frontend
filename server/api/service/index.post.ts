import type { z } from "zod";
import { useFetchApi } from "~/composables/useFetchApi";

type RequestServiceForm = z.infer<typeof serviceForm>

interface RequestSerficeAPIForm {
  vin_number: string
  city: string
  name: string
  phone_number: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<RequestServiceForm>(event)

  const locale = getQuery(event).lang as string

  const data: RequestSerficeAPIForm = {
    vin_number: '1',
    city: body.region,
    name: body.name || '',
    phone_number: body.phone
  }

  const response = useFetchApi('/service-request/', locale, { method: 'post', body: JSON.stringify(data) })
  return response
}) 
