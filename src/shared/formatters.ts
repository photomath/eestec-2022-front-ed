export const formatMoney = (amount: string) => {
  return `$${amount}`
}

export const formatLocaleDate = (date: Date) => {
  return date.toLocaleDateString()
}

export const formatISODate = (date: Date) => {
  return date.toISOString().split('T')[0]
}
