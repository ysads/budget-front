import { factoryBuilder } from '#/factory-builder'
import currencies from '@/support/currencies'
import sample from 'lodash/sample'
import SadInput from '@/components/sad/SadInput'

const factory = (args = {}) => factoryBuilder(SadInput, {
  propsData: {
    value: 'value',
    name: 'input',
    label: 'label',
    ...args.propsData,
  },
})

describe('SadInput', () => {
  describe('default behaviour', () => {
    it('has a null money', () => {
      const wrapper = factory()

      expect(wrapper.vm.money).toBeUndefined()
    })

    it('has no placeholder', () => {
      const wrapper = factory()

      expect(wrapper.vm.placeholder).toEqual('')
    })

    it('renders label', () => {
      const wrapper = factory()

      expect(wrapper.find("[data-test='label']").props().text).toEqual('label')
    })
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

    it('renders error class on input', () => {
      const wrapper = factory({ propsData: { error: 'Invalid' } })

      const input = wrapper.find("[data-test='input']")

      expect(input.classes()).toContain('error')
    })
  })

  context('when parent changes value prop', () => {
    it('updates internal value', async () => {
      const wrapper = factory()

      await wrapper.setProps({ value: 'new-value' })

      expect(wrapper.vm.val).toBe('new-value')
    })
  })

  context('when input emits input', () => {
    it('emits input to parent', () => {
      const wrapper = factory()

      wrapper.find("[data-test='input']").trigger('input')

      expect(wrapper.emitted().input).toBeTruthy()
    })
  })

  context('when input emits blur', () => {
    it('emits blur to parent', () => {
      const wrapper = factory()

      wrapper.find("[data-test='input']").trigger('blur')

      expect(wrapper.emitted().blur).toBeTruthy()
    })

    context('and money is not null', () => {
      context('if value is empty', () => {
        it('leaves val as it is', () => {
          const money = { prefix: sample(currencies) }
          const wrapper = factory({ propsData: { money, value: '' } })

          wrapper.find("[data-test='input']").trigger('blur')

          expect(wrapper.vm.val).toBe('')
        })
      })

      it('formats internal value', () => {
        const currency = sample(currencies)
        const money = { prefix: currency }
        const wrapper = factory({ propsData: { money } })

        wrapper.find("[data-test='input']").trigger('blur')

        expect(wrapper.vm.val).toBe(`${currency}value`)
      })
    })
  })

  context('when input emits focus', () => {
    it('emits focus to parent', () => {
      const wrapper = factory()

      wrapper.find("[data-test='input']").trigger('focus')

      expect(wrapper.emitted().focus).toBeTruthy()
    })

    context('and money is not null', () => {
      it('cleans internal value', async () => {
        const money = { prefix: sample(currencies) }
        const wrapper = factory({ propsData: { money } })

        await wrapper.find("[data-test='input']").trigger('blur')
        await wrapper.find("[data-test='input']").trigger('focus')

        expect(wrapper.vm.val).toBe('value')
      })
    })
  })
})
