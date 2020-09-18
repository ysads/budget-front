import currencies from './currencies'

export const currencySettings = (budget) => ({
  decimal: ',',
  thousands: '.',
  prefix: `${currencies[budget.currency]} `,
  precision: 2,
  masked: false,
})

export const fromCents = (cents) => cents / 100.0
