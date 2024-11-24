export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce(
    (groups, item) => {
      ;(groups[key(item)] ||= []).push(item)
      return groups
    },
    {} as Record<K, T[]>,
  )

export function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}
