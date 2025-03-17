export const useFormat = () => {
  const price = (p: number | undefined | null, prefix: string = 'so\'m') => {
    if (typeof p !== 'number') return "";

    return `${p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${prefix}`;
  }
  return { price }
}
