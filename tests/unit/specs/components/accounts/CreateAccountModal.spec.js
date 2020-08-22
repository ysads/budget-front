import CreateAccountModal from '@/components/accounts/CreateAccountModal'
import { factoryBuilder } from '#/factory-builder'

const factory = (args = {}) => factoryBuilder(CreateAccountModal, {
  mocks: { BaseModal: true },
})

describe('CreateAccountModal', () => {
  context('when BaseModal emits close', () => {
    it('emits close', async () => {
      const wrapper = factory()

      await wrapper.find("[data-test='base-modal']").vm.$emit('close')

      expect(wrapper.emitted().close).toBeTruthy()
    })
  })
})
