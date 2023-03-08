export const CURRENCY_SYMBOL = '$'

export function formatPrice(price: number) {
  return `${CURRENCY_SYMBOL}${computePrice(price)}`
}

export function computePrice(price: number) {
  return price / 100
}
