import * as money from '@/support/money'

describe('Money', () => {
  describe('#fromCents', () => {
    it('is the cents representation of a given amount', () => {
      expect(money.fromCents(-200)).toEqual(-2.0)
      expect(money.fromCents(0)).toEqual(0.0)
      expect(money.fromCents(23400)).toEqual(234.00)
    })
  })

  describe('#currencySettings', () => {
    it('maps a budget to an object with currency mapped to its proper symbol', () => {
      const mockBudget = { currency: 'JPY' }

      expect(money.currencySettings(mockBudget)).toEqual({
        decimal: ',',
        thousands: '.',
        prefix: '¥ ',
        precision: 2,
        masked: false,
      })
    })
  })
})
