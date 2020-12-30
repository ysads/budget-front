import CreateCategoryModal from '@/components/categories/CreateCategoryModal'
import factories from '#/factories'
import Faker from 'faker'
import { CATEGORIES, CATEGORY_GROUPS } from '@/store/namespaces'
import { factoryBuilder } from '#/factory-builder'

const budget = factories.budget.build()
const categoryGroups = factories.categoryGroup.buildList(2)
const form = {
  categoryGroupId: categoryGroups[0].id,
  name: Faker.commerce.department(),
}

const factory = (args = {}) => factoryBuilder(CreateCategoryModal, {
  data: args.data,
  propsData: { budget },
  mocks: { BaseModal: true },
  store: {
    [CATEGORIES]: {
      actions: {
        createCategory: args.createCategory || jest.fn(() => Promise.resolve()),
      },
    },
    [CATEGORY_GROUPS]: {
      state: { categoryGroups },
    },
  },
})

describe('CreateCategoryModal', () => {
  it('renders name input', () => {
    const wrapper = factory()
    const label = wrapper.find("[data-test='category-name']")
    const input = label.find("[data-test='input']")

    expect(label.props().text).toEqual('CreateCategoryModal.name')
    expect(input.exists()).toBeTruthy()
  })

  it('renders category group select ', () => {
    const wrapper = factory()
    const label = wrapper.find("[data-test='category-group']")
    const options = wrapper.findAll("[data-test='select-option']")

    expect(label.props().text).toEqual('CreateCategoryModal.categoryGroup')
    expect(options.length).toEqual(categoryGroups.length)
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
      const createCategory = jest.fn()
      const wrapper = factory({
        data: { form },
        createCategory,
      })

      await wrapper.find("[data-test='form']").trigger('submit.prevent')

      expect(createCategory).toHaveBeenCalledWith(expect.anything(), {
        ...form,
        budgetId: budget.id,
      })
    })

    context('and validation fails', () => {
      it('does call createAccount', async () => {
        const createCategory = jest.fn()
        const wrapper = factory({
          data: { form },
          createCategory,
        })
        jest.spyOn(wrapper.vm, 'isValid').mockReturnValue(false)

        await wrapper.find("[data-test='form']").trigger('submit.prevent')

        expect(createCategory).not.toHaveBeenCalled()
      })
    })
  })
})
