export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  )
}

export function formatPrice(price: number | undefined, currency: string = "UZS") {
  if (!price) return;
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + " " + currency;
}
