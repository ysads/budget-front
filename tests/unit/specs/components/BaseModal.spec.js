import BaseModal from '@/components/BaseModal'
import { factoryBuilder } from '#/factory-builder'

const factory = (args = {}) => factoryBuilder(BaseModal, {
  propsData: args.propsData,
  slots: args.slots,
})

describe('BaseModal', () => {
  it('renders content passed to foot slot', () => {
    const button = '<button id="btn">hello</button>'
    const wrapper = factory({ slots: { footer: button } })

    const item = wrapper.find('#btn')

    expect(item.exists()).toBeTruthy()
  })

  it('renders content passed to main slot', () => {
    const content = '<div id="content">hello</div>'
    const wrapper = factory({ slots: { default: content } })

    const item = wrapper.find('#content')

    expect(item.exists()).toBeTruthy()
  })

  it('does not render a title by default', () => {
    const wrapper = factory()

    const item = wrapper.find("[data-test='title']")

    expect(item.exists()).toEqual(false)
  })

  context('when title prop is given', () => {
    it('renders a title', () => {
      const mockTitle = 'mock'
      const wrapper = factory({ propsData: { title: mockTitle } })

      const item = wrapper.find("[data-test='title']")

      expect(item.text()).toEqual(mockTitle)
    })
  })

  context('when overlay is clicked', () => {
    it('emits close', async () => {
      const wrapper = factory()

      await wrapper.find("[data-test='overlay']").trigger('click')

      expect(wrapper.emitted().close).toBeTruthy()
    })
  })

  context('when close button is clicked', () => {
    it('emits close', async () => {
      const wrapper = factory()

      await wrapper.find("[data-test='close-btn']").trigger('click')

      expect(wrapper.emitted().close).toBeTruthy()
    })
  })
})
