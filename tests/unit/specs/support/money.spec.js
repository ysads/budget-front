import currencies from '@/support/currencies'
import factories from '#/factories'
import * as money from '@/support/money'

describe('Money', () => {
  describe('#cleanMask', () => {
    it('converts string with decimal and thousands markers to float', () => {
      const budget = factories.budget.build()

      expect(money.cleanMask('5.452,96', budget)).toStrictEqual(5452.96)
    })
  })

  describe('#currencyToCents', () => {
    it('cleans formatted value converting it to cents', () => {
      const budget = factories.budget.build()

      expect(money.currencyToCents('5.452,96', budget)).toStrictEqual(545296)
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

  describe('#fromCents', () => {
    it('is unities representation of a given amount in cents', () => {
      expect(money.fromCents(-200)).toStrictEqual(-2.0)
      expect(money.fromCents(0)).toStrictEqual(0.0)
      expect(money.fromCents(23405)).toStrictEqual(234.05)
    })
  })

  describe('#toCents', () => {
    it('is the cents representation of a given amount in unities', () => {
      expect(money.toCents(-2.0)).toStrictEqual(-200)
      expect(money.toCents(0)).toStrictEqual(0)
      expect(money.toCents(234.05)).toStrictEqual(23405)
    })
  })

})
