import * as repository from '@/repositories/category-groups'
import CreateCategoryGroupModal from '@/components/category-groups/CreateCategoryGroupModal'
import factories from '#/factories'
import faker from 'faker'
import { factoryBuilder } from '#/factory-builder'

const budget = factories.budget.build()
const form = {
  name: faker.commerce.department(),
}

const factory = (args = {}) => factoryBuilder(CreateCategoryGroupModal, {
  data: args.data,
  propsData: { budget },
})

repository.createCategoryGroup = jest.fn()

describe('CreateCategoryGroupModal', () => {
  it('renders name input', () => {
    const wrapper = factory()
    const label = wrapper.find("[data-test='category-group-name']")
    const input = label.find("[data-test='input']")

    expect(label.props().text).toEqual('CreateCategoryGroupModal.name')
    expect(input.exists()).toBeTruthy()
  })

  context('when BaseModal emits close', () => {
    it('emits close', () => {
      const wrapper = factory()

      wrapper.find("[data-test='base-modal']").vm.$emit('close')

      expect(wrapper.emitted().close).toBeTruthy()
    })
  })

  context('when form is submitted', () => {
    it('validates form', async () => {
      const wrapper = factory({ data: { form } })
      const isValid = jest.spyOn(wrapper.vm, 'isValid')

      await wrapper.find("[data-test='form']").trigger('submit.prevent')

      expect(isValid).toHaveBeenCalled()
    })

    it('calls createAccount with form', async () => {
      const wrapper = factory({ data: { form } })

      await wrapper.find("[data-test='form']").trigger('submit.prevent')

      expect(repository.createCategoryGroup).toHaveBeenCalledWith({
        ...form,
        budgetId: budget.id,
      })
    })

    context('and validation fails', () => {
      it('does call createAccount', async () => {
        const wrapper = factory({ data: { form } })
        jest.spyOn(wrapper.vm, 'isValid').mockReturnValue(false)

        await wrapper.find("[data-test='form']").trigger('submit.prevent')

        expect(repository.createCategoryGroup).not.toHaveBeenCalled()
      })
    })
  })
})
