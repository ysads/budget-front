import CreateCategoryGroupModal from '@/components/category-groups/CreateCategoryGroupModal'
import factories from '#/factories'
import Faker from 'faker'
import { CATEGORY_GROUPS } from '@/store/namespaces'
import { factoryBuilder } from '#/factory-builder'

const budget = factories.budget.build()
const form = {
  name: Faker.commerce.department(),
}

const factory = (args = {}) => factoryBuilder(CreateCategoryGroupModal, {
  data: args.data,
  propsData: { budget },
  mocks: { BaseModal: true },
  store: {
    [CATEGORY_GROUPS]: {
      actions: {
        createCategoryGroup: args.createCategoryGroup ||
          jest.fn(() => Promise.resolve()),
      },
    },
  },
})

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
      const createCategoryGroup = jest.fn()
      const wrapper = factory({
        data: { form },
        createCategoryGroup,
      })

      await wrapper.find("[data-test='form']").trigger('submit.prevent')

      expect(createCategoryGroup).toHaveBeenCalledWith(expect.anything(), {
        ...form,
        budgetId: budget.id,
      })
    })

    context('and validation fails', () => {
      it('does call createAccount', async () => {
        const createCategoryGroup = jest.fn()
        const wrapper = factory({
          data: { form },
          createCategoryGroup,
        })
        jest.spyOn(wrapper.vm, 'isValid').mockReturnValue(false)

        await wrapper.find("[data-test='form']").trigger('submit.prevent')

        expect(createCategoryGroup).not.toHaveBeenCalled()
      })
    })
  })
})
