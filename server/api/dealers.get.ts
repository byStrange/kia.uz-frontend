import { useFetchApi } from "~/composables/useFetchApi"
import { emptySeo } from "~/utils/serverUtils"

interface DealerAPI extends CommonModel {
  name: string
  address: string
  phone: string
  workingHours: string
  location: string
}

export interface Dealer extends Omit<DealerAPI, 'location'> {
  location: {
    lat: number,
    lng: number
  }
}

export default defineEventHandler(async (event) => {
  const cities = [
    {
      name: 'Ташкент',
      location: {
        lat: 69.279737,
        lng: 41.311151,
      },
    },
    {
      name: 'Яккасарай',
      location: {
        lat: 69.243539,
        lng: 41.28209,
      },
    },
    {
      name: 'Андижан',
      location: {
        lat: 72.352487,
        lng: 40.76721,
      },
    },
  ]

  const locale = getQuery(event).lang as string
  const fetchedDealers = await useFetchApi<DealerAPI[]>('/dealers', locale)

  let seo: SEO;

  try {
    seo = await useFetchApi<SEO>('/pages/~dealers', locale)
  }
  catch {
    seo = emptySeo
  }

  const dealers: Dealer[] = fetchedDealers.map((dealer) => {
    const [lat, lng] = dealer.location.split('|');
    return { ...dealer, location: { lat: parseFloat(lat), lng: parseFloat(lng) } }
  })

  const data = {
    dealers,
    seo: seo['seo'],
    cities,
    toJSON() {
      return { dealers, cities, seo: seo['seo'] }
    },
  }

  return data
})
