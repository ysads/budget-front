import factories from '#/factories'
import MockDate from 'mockdate'
import MonthHeader from '@/components/months/MonthHeader'
import { factoryBuilder } from '#/factory-builder'
import { localize } from '@/support/money'
import { addMonths, isoMonthToDate } from '@/support/date'

const budget = factories.budget.build()
const month = factories.month.build()

const factory = (args = {}) => factoryBuilder(MonthHeader, {
  propsData: {
    budget,
    month,
    ...args,
  },
})

describe('MonthHeader', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())

  it('renders prev button', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='prev']")

    expect(item.props()).toMatchObject({
      clickable: true,
      name: 'chevron-circle-left',
    })
  })

  it('renders next button', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='next']")

    expect(item.props()).toMatchObject({
      clickable: true,
      name: 'chevron-circle-right',
    })
  })

  it('renders month name', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='month-name']")

    expect(item.text()).toMatch(isoMonthToDate(month.isoMonth).toString())
  })

  it('renders current month to-be-budgeted', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='to-be-budgeted']")

    expect(item.text()).toMatch(/toBeBudgeted/)
    expect(item.text()).toMatch(localize(month.toBeBudgeted, budget))
  })

  describe('when prev button is clicked', () => {
    it('emits update with previous month as payload', async () => {
      const wrapper = factory()

      await wrapper.find("[data-test='prev']").vm.$emit('click')

      expect(wrapper.emitted().update).toEqual([
        [addMonths(isoMonthToDate(month.isoMonth), -1)],
      ])
    })
  })

  describe('when next button is clicked', () => {
    it('emits update with next month as payload', async () => {
      const wrapper = factory()

      await wrapper.find("[data-test='next']").vm.$emit('click')

      expect(wrapper.emitted().update).toEqual([
        [addMonths(isoMonthToDate(month.isoMonth), 1)],
      ])
    })
  })
})
