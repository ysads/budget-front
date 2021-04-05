import accounting from 'accounting'
import currencies from './currencies'

export const currencySettings = (budget) => ({
  decimal: ',',
  thousands: '.',
  prefix: `${currencies[budget.currency]} `,
  precision: 2,
  masked: false,
})

export const fromCents = (cents) => cents / 100.0

export const toCents = (units) => units * 100

export const cleanMask = (value, budget) => {
  const settings = currencySettings(budget)

  return parseFloat(
    value.replace(settings.thousands, '').replace(settings.decimal, '.'),
  )
}

export const currencyToCents = (value, budget) => {
  return toCents(cleanMask(value, budget))
}

export const totalBalance = (accounts, field) => {
  if (!accounts.length) return 0

  return accounts
    .map(a => a[field])
    .reduce((total, balance) => total + balance)
}

export const localize = (value, budget) => {
  const settings = currencySettings(budget)

  return accounting.formatMoney(
    fromCents(value),
    settings.prefix,
    settings.precision,
    settings.thousands,
    settings.decimal,
  )
}

export const balanceClasses = (val) => {
  return val >= 0 ? 'positive' : 'negative'
}
