import type { FormStep } from "~/pages/in-stock.vue";

export default defineEventHandler(async (event) => {
  const body = await readBody<FormStep[]>(event)
  const locale = getQuery(event).lang as string


  const data = {
    payment_type: ''
  }
})
