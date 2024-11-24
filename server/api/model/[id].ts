import { model as sourceModel } from '~/server/data/dumpData'
import _remove from 'lodash.remove'
import _groupBy from 'lodash.groupby'
import _mapValues from 'lodash.mapvalues'
import _cloneDeep from 'lodash.clonedeep'

import type { ModelConfiguration, ModelConfigurationFeature } from '~/types'

export default defineEventHandler(async () => {
  //const hasFeature = (feature: string, configuration: ModelConfiguration) => {
  //  return configuration.features.some((f) => f.label === feature)
  //}
  //
  const model = _cloneDeep(sourceModel)

  function cleanAndGroupFeatures(configurations: ModelConfiguration[]) {
    const featureCount = configurations.length

    const featureCountMap: Record<string, { count: number; category: string }> =
      {}

    configurations.forEach((config) => {
      config.features.forEach((feature) => {
        // Initialize feature count if not already set
        if (!featureCountMap[feature.label]) {
          featureCountMap[feature.label] = {
            count: 0,
            category: feature.category || '',
          }
        }
        featureCountMap[feature.label].count++
      })
    })

    const standardFeatures = Object.entries(featureCountMap).filter(
      ([_, value]) => {
        return value.count === featureCount
      },
    )

    configurations.forEach((config) => {
      _remove(config.features, (feature: ModelConfigurationFeature) => {
        return standardFeatures.some(([label]) => label === feature.label)
      })
    })

    return { standardFeatures, configurations }
  }

  const { standardFeatures, configurations } = cleanAndGroupFeatures(
    model.configurations,
  )

  const features = configurations.map((configuration) => {
    return configuration.features
  })

  const uniqueFeatures = features.flat().filter((feature, index, arr) => {
    return arr.findIndex((f) => f.label === feature.label) === index
  })

  const _prepareGroupStandardFeatures = _groupBy(
    standardFeatures,
    ([_, { category }]) => category,
  )

  const groupStandardFeatures = _mapValues(
    _prepareGroupStandardFeatures,
    (features) => {
      return features.map(([label, { count }]) => {
        return { label, count }
      })
    },
  )

  const groupedFeatures = _groupBy(uniqueFeatures, (i) => i.category)

  const data = {
    model: { ...model, configurations },
    features,
    groupedFeatures,
    standardFeatures,
    groupStandardFeatures,
    toJSON() {
      return {
        model: { ...model, configurations },
        features,
        groupedFeatures,
        standardFeatures,
        groupStandardFeatures,
      }
    },
  }
  return data
})
