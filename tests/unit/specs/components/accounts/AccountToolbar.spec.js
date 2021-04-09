import AccountToolbar from '@/components/accounts/AccountToolbar'
import factories from '#/factories'
import { factoryBuilder } from '#/factory-builder'

const account = factories.account.build()

const factory = () => factoryBuilder(AccountToolbar, {
  propsData: {
    account,
  },
})

describe('AccountToolbar', () => {
  it('renders new group button', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='new-transaction']")

    expect(item.text()).toMatch('newTransaction')
  })

  it('does not render transaction drawer by default', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='transaction-drawer']")

    expect(item.exists()).toBeFalsy()
  })

  context('when new transaction button is clicked', () => {
    it('renders transaction drawer with origin account', async () => {
      const wrapper = factory()
      await wrapper.find("[data-test='new-transaction']").vm.$emit('click')

      const drawer = wrapper.find("[data-test='transaction-drawer']")

      expect(drawer.props().originAccount).toEqual(account)
    })
  })
})
