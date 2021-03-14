import * as categoryGroupsRepository from '@/repositories/category-groups'
import * as categoriesRepository from '@/repositories/categories'
import CreateCategoryModal from '@/components/categories/CreateCategoryModal'
import factories from '#/factories'
import faker from 'faker'
import { factoryBuilder } from '#/factory-builder'

const budget = factories.budget.build()
const categoryGroups = factories.categoryGroup.buildList(2)
const form = {
  categoryGroupId: categoryGroups[0].id,
  name: faker.commerce.department(),
}

categoryGroupsRepository.categoryGroups.value = categoryGroups
categoriesRepository.createCategory = jest.fn()

const factory = (args = {}) => factoryBuilder(CreateCategoryModal, {
  data: args.data,
  propsData: { budget },
})

describe('CreateCategoryModal', () => {
  it('renders name input', () => {
    const wrapper = factory()
    const label = wrapper.find("[data-test='category-name']")
    const input = label.find("[data-test='input']")

    expect(label.props().text).toEqual('CreateCategoryModal.name')
    expect(input.exists()).toBeTruthy()
  })

  it('renders category group select', () => {
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
      const wrapper = factory({ data: { form } })

      await wrapper.find("[data-test='form']").trigger('submit.prevent')

      expect(categoriesRepository.createCategory).toHaveBeenCalledWith({
        ...form,
        budgetId: budget.id,
      })
    })

    context('and validation fails', () => {
      it('does call createAccount', async () => {
        const wrapper = factory({ data: { form } })
        jest.spyOn(wrapper.vm, 'isValid').mockReturnValue(false)

        await wrapper.find("[data-test='form']").trigger('submit.prevent')

        expect(categoriesRepository.createCategory).not.toHaveBeenCalled()
      })
    })
  })
})
