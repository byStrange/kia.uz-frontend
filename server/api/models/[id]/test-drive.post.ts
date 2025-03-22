import type { z } from "zod"
import type { testDriveSchema } from "~/schemas/forms"
import { useFetchApi } from "~/composables/useFetchApi"

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
  const locale = getCookie(event, 'i18n_redirected')

  if (!modelSlug) {
    return { statusCode: 400, error: 'Missing model slug route param' }
  }

  const data: TestDriveAPIForm = {
    city: body.region,
    phone_number: body.phone,
    name: body.name || '',
    comment: body.comment,
    model: modelSlug
  }

  const response = await useFetchApi('/test-drive/', locale, {
    method: 'post',
    body: JSON.stringify(data)
  })

  return { response }
})
