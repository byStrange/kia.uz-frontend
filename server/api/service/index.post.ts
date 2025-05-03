import type { z } from "zod";

type RequestServiceForm = z.infer<typeof serviceForm>

interface RequestSerficeAPIForm {
  city: string
  name: string
  phone_number: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<RequestServiceForm>(event)

  const data: RequestSerficeAPIForm = {
    city: body.region,
    name: body.name || '',
    phone_number: body.phone
  }

  const response = await $fetch('http://83.69.136.36:5409/api/service-request/', { method: 'post', body: JSON.stringify(data) });
  return response
}) 
