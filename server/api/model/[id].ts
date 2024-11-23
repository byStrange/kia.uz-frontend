import { model } from '~/server/data/dumpData'
import _remove from 'lodash.remove'
import _groupBy from 'lodash.groupby'
import _mapValues from 'lodash.mapvalues'

import type { ModelConfiguration, ModelConfigurationFeature } from '~/types'

export default defineEventHandler(async () => {
  //const hasFeature = (feature: string, configuration: ModelConfiguration) => {
  //  return configuration.features.some((f) => f.label === feature)
  //}

  function cleanAndGroupFeatures(configurations: ModelConfiguration[]) {
    const featureCount = configurations.length

    // Step 1: Create a count map for each feature's occurrence across configurations
    const featureCountMap: Record<string, { count: number; category: string }> =
      {}

    console.log('before loop we have ', featureCount, ' configurations and')
    configurations.forEach((config) => {
      console.log('config has ', config.features.length, ' features')
    })

    configurations.forEach((config) => {
      config.features.forEach((feature) => {
        // Initialize feature count if not already set
        if (!featureCountMap[feature.label]) {
          featureCountMap[feature.label] = {
            count: 0,
            category: feature.category,
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

    console.log(standardFeatures.length)

    configurations.forEach((config) => {
      console.log(
        'removed from ' + config.name + ' features: \n',
        _remove(config.features, (feature: ModelConfigurationFeature) => {
          return standardFeatures.some(([label]) => label === feature.label)
        }),
      )
    })

    console.log('after loop we have ', featureCount, ' configurations and')
    configurations.forEach((config) => {
      console.log('config has ', config.features.length, ' features')
    })

    return { standardFeatures, configurations }
  }

  const { standardFeatures, configurations } = cleanAndGroupFeatures(
    model.configurations,
  )

  model.configurations = configurations

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

  return {
    model,
    features,
    groupedFeatures,
    standardFeatures,
    groupStandardFeatures,
  }
})
