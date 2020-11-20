import * as DateUtils from '@/support/date'
import { Date } from 'core-js'

describe('DateUtils', () => {
  describe('#isoMonth', () => {
    it('is a representation of date in YYYY-mm format', () => {
      const date1 = new Date('2020-01-01')
      const date2 = new Date('2020-04-29')
      const date3 = new Date('2020-12-25')

      expect(DateUtils.isoMonth(date1)).toEqual('2020-01')
      expect(DateUtils.isoMonth(date2)).toEqual('2020-04')
      expect(DateUtils.isoMonth(date3)).toEqual('2020-12')
    })
  })

  describe('#isoMonthToDate', () => {
    it('converts a YYYY-mm string into a date representing a day in the specified month', () => {
      const date1 = DateUtils.isoMonthToDate('2020-01')
      const date2 = DateUtils.isoMonthToDate('2020-12')
      const date3 = DateUtils.isoMonthToDate('2020-04')

      expect(date1).toEqual(new Date(2020, 0, 31))
      expect(date2).toEqual(new Date(2020, 11, 31))
      expect(date3).toEqual(new Date(2020, 3, 30))
    })
  })

  describe('#addMonths', () => {
    it('returns a new Date obj with the given months ahead of before', () => {
      const date1 = new Date('2020-01')
      const date2 = new Date('2020-12')
      const date3 = new Date('2020-05-05')

      expect(DateUtils.addMonths(date1, -1)).toEqual(new Date('2019-12-01'))
      expect(DateUtils.addMonths(date2, 2)).toEqual(new Date('2021-02-01'))
      expect(DateUtils.addMonths(date3, 1)).toEqual(new Date('2020-06-05'))
    })
  })
})
