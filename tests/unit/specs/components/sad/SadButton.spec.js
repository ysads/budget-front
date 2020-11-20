import SadButton from '@/components/sad/SadButton'
import { factoryBuilder } from '#/factory-builder'

const factory = (args = {}) => factoryBuilder(SadButton, {
  propsData: {
    type: 'primary',
    size: 'normal',
    ...args.propsData,
  },
})

describe('SadButton', () => {
  context('default behaviour', () => {
    it('has primary type', () => {
      const wrapper = factory()

      expect(wrapper.vm.type).toEqual('primary')
    })

    it('has normal size', () => {
      const wrapper = factory()

      expect(wrapper.vm.size).toEqual('normal')
    })
  })

  it('adds a class according to type', () => {
    const wrapper = factory({ propsData: { type: 'primary' } })
    const button = wrapper.find("[data-test='button']")

    expect(button.classes()).toContain('button--primary')
  })

  it('adds a class according to size', () => {
    const wrapper = factory({ propsData: { size: 'small' } })
    const button = wrapper.find("[data-test='button']")

    expect(button.classes()).toContain('button--small')
  })

  context('when icon prop is given', () => {
    it('renders a matching icon', () => {
      const wrapper = factory({ propsData: { icon: 'plus' } })
      const icon = wrapper.find("[data-test='icon']")

      expect(icon.classes()).toContain('fa-plus')
    })
  })

  context('when full width prop is true', () => {
    it('renders button with button--full class', () => {
      const wrapper = factory({ propsData: { fullWidth: true } })
      const button = wrapper.find("[data-test='button']")

      expect(button.classes()).toContain('button--full')
    })
  })

  context('when button is clicked', () => {
    it('emits click', async () => {
      const wrapper = factory()

      await wrapper.find("[data-test='button']").trigger('click')

      expect(wrapper.emitted().click).toBeTruthy()
    })
  })
})
