export const useSharedPageData = <T>() => useState<T | null>('pageData', () => null)
