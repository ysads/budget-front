import currencies from './currencies'

export const currencySettings = (budget) => ({
  decimal: ',',
  thousands: '.',
  prefix: `${currencies[budget.currency]} `,
  precision: 2,
  masked: false,
})

export const fromCents = (cents) => cents / 100.0

export const toCents = (unities) => unities * 100

export const cleanMask = (value, budget) => {
  const settings = currencySettings(budget)

  return parseFloat(
    value.replace(settings.thousands, '').replace(settings.decimal, '.'),
  )
}

export const currencyToCents = (value, budget) => {
  return toCents(cleanMask(value, budget))
}
