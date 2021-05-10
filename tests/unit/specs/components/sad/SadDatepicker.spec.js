import MockDate from 'mockdate'
import SadDatePicker from '@/components/sad/SadDatePicker'
import { factoryBuilder } from '#/factory-builder'

const factory = (args = {}) => factoryBuilder(SadDatePicker, {
  propsData: {
    label: 'label',
    name: 'name',
    format: 'MM 👍 yyyy 👎 dd',
    value: '',
    ...args,
  },
})

describe('SadDatePicker', () => {
  it('renders label', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='label']")

    expect(item.props().text).toEqual('label')
  })

  it('always emits dates using yyyy-MM-dd format', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='picker']")

    expect(item.props().valueFormat).toEqual('yyyy-MM-dd')
  })

  it('renders date picker with proper date format', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='picker']")

    expect(item.props().format).toEqual('MM 👍 yyyy 👎 dd')
  })

  describe('when no value is given', () => {
    beforeEach(() => MockDate.set(new Date()))
    afterEach(() => MockDate.reset())

    it('defaults value to current date', () => {
      const { vm } = factory({ value: undefined })

      expect(vm.value).toEqual(new Date())
    })
  })

  describe('when error prop is given', () => {
    it('renders tip with info', () => {
      const wrapper = factory({ tip: 'Help text' })

      const tip = wrapper.find("[data-test='tip']")

      expect(tip.props()).toMatchObject({
        text: 'Help text',
        variant: 'info',
      })
    })
  })

  describe('when error prop is given', () => {
    it('renders tip with error', () => {
      const wrapper = factory({ error: 'Invalid' })

      const tip = wrapper.find("[data-test='tip']")

      expect(tip.props()).toMatchObject({
        text: 'Invalid',
        variant: 'error',
      })
    })
  })

  it('proxies blur events from picker', async () => {
    const wrapper = factory()

    await wrapper.find("[data-test='picker']").vm.$emit('blur')

    expect(wrapper.emitted().blur).toBeTruthy()
  })

  it('proxies input events from picker', async () => {
    const wrapper = factory()

    await wrapper
      .find("[data-test='picker']")
      .vm.$emit('input', '2021-03-05')

    expect(wrapper.emitted().input).toBeTruthy()
  })
})
