import factories from '#/factories';
import useCategoryForm, { CategoryForm } from '@/use/forms/category-form';
import { createCategory } from '@/repositories/categories';
import { ref } from 'vue';

jest.mock('@/repositories/categories', () => ({
  createCategory: jest.fn(),
}));

const budget = factories.budget.build();

describe('useCategoryForm', () => {
  describe('#form', () => {
    it('defaults budgetId to that of the one passed as argument', () => {
      const { form } = useCategoryForm({ budget: ref(budget) });

      expect(form.budgetId).toEqual(budget.id);
    });
  });

  describe('#resetForm', () => {
    it('clears form fields to default values', async () => {
      const { form, resetForm } = useCategoryForm({ budget: ref(budget) });

      form.name = 'My cool category';
      form.groupName = 'My group name';

      expect(form).toMatchObject({
        budgetId: budget.id,
        groupName: 'My group name',
        name: 'My cool category',
      });

      resetForm();

      expect(form).toMatchObject({
        budgetId: budget.id,
        groupName: '',
        name: '',
      });
    });
  });

  describe('#saveForm', () => {
    it('calls createCategory', () => {
      const { saveForm } = useCategoryForm({ budget: ref(budget) });

      saveForm({} as CategoryForm);

      expect(createCategory).toHaveBeenCalled();
    });
  });

  describe('#saveMessage', () => {
    it('is `created`', () => {
      const { saveMessage } = useCategoryForm({ budget: ref(budget) });

      expect(saveMessage.value).toEqual('general.created');
    });
  });
});
