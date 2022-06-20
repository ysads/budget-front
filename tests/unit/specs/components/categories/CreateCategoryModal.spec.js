import * as categoriesRepository from '@/repositories/categories';
import CreateCategoryModal from '@/components/categories/CreateCategoryModal';
import factories from '#/factories';
import setupComponent from '#/setup-component';
import alert from '@/support/alert';

jest.mock('@/support/alert', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

const budget = factories.budget.build();
const groups = ['group one', 'group two'];

categoriesRepository.createCategory = jest.fn();
categoriesRepository.groups.value = groups;

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

  it('renders category group select that allows creation', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='group-name']");

    expect(item.props()).toMatchObject({
      allowCreate: true,
      label: 'CreateCategoryModal.categoryGroup',
    });
    expect(item.props().options.length).toEqual(groups.length);
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

    it('dispatches a success alert', async () => {
      const wrapper = factory();

      await wrapper.find("[data-test='form']").trigger('submit.prevent');

      expect(alert.success).toHaveBeenCalledWith('general.created');
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
