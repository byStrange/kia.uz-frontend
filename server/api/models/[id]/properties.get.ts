import type { Configuration, Model, ModelEngine } from "./index.get"
import { useFetchApi } from "~/composables/useFetchApi"

export interface ModelPropertiesPage {
  model: Model,
  configurationWithEngines: ConfigurationWithEngines[]
}

interface ConfigurationWithEngines extends Configuration {
  parent_engine: ModelEngine
}

export default defineEventHandler(async (event) => {
  const locale = getCookie(event, 'i18n_redirected');
  const param = getRouterParam(event, 'id');

  const model = await useFetchApi<Model>(`/models/${param}/`, locale);
  const configurationsWithEngines: ConfigurationWithEngines[] = model.engines.map((engine) => engine.configurations.map((conf) => ({ ...conf, parent_engine: engine }))).flat()

  return {
    model,
    configurationsWithEngines
  }

})
