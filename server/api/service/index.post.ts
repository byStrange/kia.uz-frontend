import type { z } from "zod";

type RequestServiceForm = z.infer<typeof serviceForm>

interface RequestSerficeAPIForm {
  vin_number: string
  issue_year: number
  city: string
  name: string
  model: uuid
  dealer: uuid
  job_type?: uuid
  date?: uuid
}

export default defineEventHandler(async (event) => {
  const body = await readBody<RequestServiceForm>(event)
  const locale = getCookie(event, 'i18n_redirected')

  const data: RequestSerficeAPIForm = {
    vin_number: '1',
    issue_year: parseInt(body.issue_year),
    city: body.region,
    name: body.name || '',
    model: body.model || '',
    job_type: body.work_type,
    date: body.time
  }
}) 
