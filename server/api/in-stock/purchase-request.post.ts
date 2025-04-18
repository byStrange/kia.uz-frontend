import { useFetchApi } from "~/composables/useFetchApi"

export type PurchaseRequestData = {
  code: string
  payment_type: string
  model: string
  color: string
  configuration: string
  installment_plan?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<PurchaseRequestData>(event)
  const locale = getQuery(event).lang as string


  const response = await useFetchApi('/purchase-request/create', locale, { method: 'post', body: JSON.stringify(body) })
  return response
})
