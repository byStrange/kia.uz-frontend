import type { z } from "zod"
import type { testDriveSchema } from "~/schemas/forms"

interface TestDriveAPIForm {
  city: string
  phone_number: string
  name: string
  comment?: string
  model: uuid
}

type RequestTestDriveForm = z.infer<typeof testDriveSchema>


export default defineEventHandler(async (event) => {
  const body = await readBody<RequestTestDriveForm>(event)
  const modelSlug = getRouterParam(event, 'id')

  if (!modelSlug) {
    return { statusCode: 400, error: 'Missing model slug route param' }
  }

  const data: TestDriveAPIForm = {
    city: body.region,
    phone_number: body.phone,
    name: body.name || '-',
    comment: body?.comment || '-',
    model: modelSlug
  }

  const response = await $fetch('http://83.69.136.36:5409/api/test-drive/', {
    method: 'post',
    body: JSON.stringify(data)
  })

  return { response }
})
