import * as repository from '@/repositories/category-groups';
import CreateCategoryGroupModal from '@/components/category-groups/CreateCategoryGroupModal';
import factories from '#/factories';
import faker from 'faker';
import setupComponent from '#/setup-component';

const budget = factories.budget.build();
const form = {
  name: faker.commerce.department(),
};

const factory = () =>
  setupComponent(CreateCategoryGroupModal, {
    props: { budget, show: true },
    withMount: true,
  });

repository.createCategoryGroup = jest.fn();

describe('CreateCategoryGroupModal', () => {
  it('renders name input', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='name']");

    expect(item.props().label).toEqual('CreateCategoryGroupModal.name');
  });

  describe('when modal emits close', () => {
    it('emits close', async () => {
      const wrapper = factory();

      await wrapper.findComponent("[data-test='modal']").vm.$emit('close');

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

      expect(repository.createCategoryGroup).toHaveBeenCalled();
    });

    describe.skip('and validation fails', () => {
      it('does call createAccount', async () => {
        const wrapper = factory({ data: { form } });
        jest.spyOn(wrapper.vm, 'isValid').mockReturnValue(false);

        await wrapper.find("[data-test='form']").trigger('submit.prevent');

        expect(repository.createCategoryGroup).not.toHaveBeenCalled();
      });
    });
  });

  describe('when show prop changes', () => {
    it('cleans forms', async () => {
      const wrapper = factory();

      await wrapper
        .findComponent('[data-test="name"]')
        .vm.$emit('update:model-value', 'test');

      expect(wrapper.vm.form.name).toEqual('test');

      await wrapper.setProps({ show: false });

      expect(wrapper.vm.form.name).toEqual('');
    });
  });
});
