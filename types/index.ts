export type ModelConfigurationFeature = {
    label: string;
    category: string;
}

export interface ModelConfiguration {
    name: string;
    price: string;
    discountedPrice?: string;
    engine: string;
    features: ModelConfigurationFeature[]
}

export interface Model {
    name: string;
    configurations: ModelConfiguration[]
}
