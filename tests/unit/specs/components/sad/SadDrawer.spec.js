import { factoryBuilder } from '#/factory-builder'
import SadDrawer from '@/components/sad/SadDrawer'

const factory = (args = {}) => factoryBuilder(SadDrawer, {
  propsData: args.props,
  slots: args.slots,
})

describe('SadDrawer', () => {
  it('renders content passed to main slot', () => {
    const wrapper = factory({
      slots: { default: '<p id="content">my content</p>' },
    })
    const item = wrapper.find('#content')

    expect(item.text()).toEqual('my content')
  })

  it('renders content passed to footer', () => {
    const wrapper = factory({
      slots: { footer: '<p id="footer">my footer</p>' },
    })
    const item = wrapper.find('#footer')

    expect(item.text()).toEqual('my footer')
  })

  describe('when title is given', () => {
    it('renders title', () => {
      const wrapper = factory({ props: { title: 'my title' } })
      const item = wrapper.find("[data-test='title']")

      expect(item.text()).toEqual('my title')
    })
  })

  describe('when close is clicked', () => {
    it('emits close', async () => {
      const wrapper = factory()

      await wrapper.find("[data-test='close-btn']").vm.$emit('click')

      expect(wrapper.emitted().close).toBeTruthy()
    })
  })

  describe('when overlay is clicked', () => {
    it('emits close', async () => {
      const wrapper = factory()

      await wrapper.find("[data-test='overlay']").trigger('click')

      expect(wrapper.emitted().close).toBeTruthy()
    })
  })
})
