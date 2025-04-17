import type { Configuration, FeatureGroup } from "./index.get"
import { useFetchApi } from "~/composables/useFetchApi"

export interface ModelPricingAndDetailsPage {
  standard_features: { name: string, values: string[] }[],
  grouped_features: {
    [key: string]: FeatureGroup[]
  } 
  filtered_configurations: Configuration[]
}

export default defineEventHandler(async  (event) => {
  const locale = getQuery(event).lang as string
  const param = getRouterParam(event, 'id');
  
  const pageData = await useFetchApi<ModelPricingAndDetailsPage>(`/models/${param}/features/`, locale)

  return {
    ...pageData
  }
  
})
