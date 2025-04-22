import type { Configuration, Model, ModelEngine } from "./index.get"
import { useFetchApi } from "~/composables/useFetchApi"

export interface ModelPropertiesPage {
  model: Model,
  configurationWithEngines: ConfigurationWithEngines[]
}

interface ConfigurationWithEngines extends Configuration {
  parent_engine: Partial<ModelEngine>
}

export default defineEventHandler(async (event) => {
  const locale = getQuery(event).lang as string
  const param = getRouterParam(event, 'id');

  const model = await useFetchApi<Model>(`/models/${param}/`, locale);
  const configurationsWithEngines: ConfigurationWithEngines[] = model.engines.map((engine) => engine.configurations.map((conf) => ({ ...conf, parent_engine: { name: engine.name, desc: engine.desc, gear: engine.gear, drive: engine.drive } }))).flat()

  return {
    model,
    configurationsWithEngines
  }

})
