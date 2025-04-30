export const useSharedPageData = <T>(modelId: uuid) => useState<T | null>(modelId, () => null)
