import commit from '@/store/months/mutations'
import factories from '#/factories'

describe('INSERT_MONTH', () => {
  it('appends month to state', () => {
    const mockState = { months: {} }
    const mockMonth = factories.month.build()

    commit.INSERT_MONTH(mockState, mockMonth)

    expect(mockState.months).toEqual({
      [mockMonth.isoMonth]: mockMonth,
    })
  })
})
