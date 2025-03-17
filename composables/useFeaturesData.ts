export const useSharedFeaturesData = <T>() => useState<T | null>('featuresData', () => null)
