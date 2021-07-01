import * as categoryGroupsRepository from '@/repositories/category-groups';
import * as categoriesRepository from '@/repositories/categories';
import CreateCategoryModal from '@/components/categories/CreateCategoryModal';
import factories from '#/factories';
import setupComponent from '#/setup-component';

const budget = factories.budget.build();
const categoryGroups = factories.categoryGroup.buildList(2);

categoryGroupsRepository.categoryGroups.value = categoryGroups;
categoriesRepository.createCategory = jest.fn();

const factory = () =>
  setupComponent(CreateCategoryModal, {
    props: { budget, show: true },
    withMount: true,
  });

describe('CreateCategoryModal', () => {
  it('renders name input', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='name']");

    expect(item.props().label).toEqual('CreateCategoryModal.name');
  });

  it('renders category group select', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='category-group-id']");

    expect(item.props().label).toEqual('CreateCategoryModal.categoryGroup');
    expect(item.props().options.length).toEqual(categoryGroups.length);
  });

  describe('when modal emits close', () => {
    it('emits close', () => {
      const wrapper = factory();

      wrapper.findComponent("[data-test='modal']").vm.$emit('close');

      expect(wrapper.emitted().close).toBeTruthy();
    });
  });

  describe('when form is submitted', () => {
    it.skip('validates form', async () => {
      const wrapper = factory();
      const isValid = jest.spyOn(wrapper.vm, 'isValid');

      await wrapper.find("[data-test='form']").trigger('submit.prevent');

      expect(isValid).toHaveBeenCalled();
    });

    it('calls createAccount with form', async () => {
      const wrapper = factory();

      await wrapper.find("[data-test='form']").trigger('submit.prevent');

      expect(categoriesRepository.createCategory).toHaveBeenCalled();
    });

    describe.skip('and validation fails', () => {
      it('does call createAccount', async () => {
        const wrapper = factory();
        jest.spyOn(wrapper.vm, 'isValid').mockReturnValue(false);

        await wrapper.find("[data-test='form']").trigger('submit.prevent');

        expect(categoriesRepository.createCategory).not.toHaveBeenCalled();
      });
    });
  });
});
