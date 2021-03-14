import SadSelect from '@/components/sad/SadSelect'
import { factoryBuilder } from '#/factory-builder'

const factory = (args = {}) => factoryBuilder(SadSelect, {
  propsData: {
    label: 'label',
    name: 'name',
    value: '',
    options: [
      { label: 'label 1', options: [{ value: 'v1', label: 'value 1' }] },
      { label: 'label 2', options: [{ value: 'v2', label: 'value 2' }] },
    ],
    ...args.propsData,
  },
})

describe('SadSelect', () => {
  it('has no placeholder', () => {
    const wrapper = factory()

    expect(wrapper.vm.placeholder).toEqual('')
  })

  it('renders label', () => {
    const wrapper = factory()

    expect(wrapper.find("[data-test='label']").props().text).toEqual('label')
  })

  context('when error prop is given', () => {
    it('renders tip with error', () => {
      const wrapper = factory({ propsData: { error: 'Invalid' } })

      const tip = wrapper.find("[data-test='tip']")

      expect(tip.props()).toMatchObject({
        text: 'Invalid',
        variant: 'error',
      })
    })
  })
})
