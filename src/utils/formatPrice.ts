export function formatPrice(price?: number) {
  if (!price) {
    return null
  }

  return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
}
