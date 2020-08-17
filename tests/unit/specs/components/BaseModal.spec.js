import BaseModal from '@/components/BaseModal'
import { factoryBuilder } from '#/factory-builder'

const factory = (args = {}) => factoryBuilder(BaseModal)

describe('BaseModal', () => {
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
