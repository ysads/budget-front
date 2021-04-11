import SadCheckbox from '@/components/sad/SadCheckbox'
import sample from 'lodash/sample'
import { factoryBuilder } from '#/factory-builder'

const factory = (args = {}) => factoryBuilder(SadCheckbox, {
  propsData: {
    label: 'label',
    name: 'name',
    value: '',
    ...args,
  },
})

describe('SadCheckbox', () => {
  it('renders label', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='label']")

    expect(item.text()).toEqual('label')
  })

  it('matches checkbox checked prop with value', () => {
    const value = sample([true, false])
    const wrapper = factory({ value })
    const item = wrapper.find("[data-test='input']")

    expect(item.element.checked).toEqual(value)
  })

  describe('when tip prop is given', () => {
    it('renders tip with tip', () => {
      const wrapper = factory({ tip: 'Help text' })

      const tip = wrapper.find("[data-test='tip']")

      expect(tip.props()).toMatchObject({
        text: 'Help text',
        variant: 'info',
      })
    })
  })

  describe('when input element emits input', () => {
    it('emits input with input checked state', async () => {
      const checked = sample([true, false])
      const wrapper = factory()

      const input = wrapper.find("[data-test='input']")
      input.element.checked = checked
      await input.trigger('input')

      expect(wrapper.emitted().input).toEqual([
        [checked],
      ])
    })
  })
})
