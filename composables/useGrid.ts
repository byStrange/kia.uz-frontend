type GridOptions = { useContainer: boolean; gap: number; columns: number }
export const useGrid = (
  options: GridOptions = { useContainer: true, gap: 0, columns: 0 },
) => {
  if (!import.meta.client) return

  let screenWidth = window.innerWidth

  if (options.useContainer) {
    screenWidth = useContainer().bounding.width.value
  }


  const columnWidth =
    (screenWidth - (options.columns - 1) * options.gap) / options.columns

  return columnWidth
}
