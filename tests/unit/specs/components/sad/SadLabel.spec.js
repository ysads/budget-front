import SadLabel from '@/components/sad/SadLabel'
import { factoryBuilder } from '#/factory-builder'

const DummyInput = {
  template: '<input type="text" id="input" />',
}

const factory = (args = {}) => factoryBuilder(SadLabel, {
  propsData: {
    text: 'label-text',
    to: 'input-id',
    ...args.propsData,
  },
  slots: {
    default: DummyInput,
  },
})

describe('SadLabel', () => {
  context('default behaviour', () => {
    it('renders given text', () => {
      const wrapper = factory()
      const item = wrapper.find("[data-test='text']")

      expect(item.text()).toBe('label-text')
    })

    it('renders correlates label to given to prop', () => {
      const wrapper = factory()
      const item = wrapper.find("[data-test='label']")

      expect(item.attributes().for).toBe('input-id')
    })

    it('renders input passed as prop', () => {
      const wrapper = factory()
      const item = wrapper.find('#input')

      expect(item.exists()).toBe(true)
    })
  })
})
