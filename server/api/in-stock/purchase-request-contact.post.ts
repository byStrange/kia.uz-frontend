import { useFetchApi } from "~/composables/useFetchApi"

export type PurchaseRequestsContactForm  ={
  name: string
  phone_number: string
  city: string
  purchase_request: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<PurchaseRequestsContactForm>(event)
  const locale = getQuery(event).lang as string

  const response = await useFetchApi('/purchase-request-contact/create', locale, {
    method: 'post',
    body: body
  })

  return response
})
