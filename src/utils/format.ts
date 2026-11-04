export function formatPrice(value: number, currency = '$') {
  return `${currency}${value.toFixed(2)}`;
}
