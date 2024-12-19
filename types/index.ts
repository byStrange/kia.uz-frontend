export type ModelConfigurationFeature = {
  label: string
  category?: string
}

export type ModelConfigurationGroup = [
  string,
  ModelConfigurationFeature[] | { label: string; count: number },
]

export interface ModelConfiguration {
  name: string
  price: string
  discountedPrice?: string
  engine: string
  features: ModelConfigurationFeature[]
}

export interface Model {
  name: string
  configurations: ModelConfiguration[]
}

export type ModelGroup = {
  label: string
  models: {
    name: string
    image: string
    from: string
    benefitUpto?: string
    electric?: boolean
  }[]
}
