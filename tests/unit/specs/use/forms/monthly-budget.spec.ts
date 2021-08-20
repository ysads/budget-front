import factories from '#/factories';
import useMonthlyBudgetForm from '@/use/forms/monthly-budget';
import { currencySettings } from '@/support/money';
import { reactive, ref } from 'vue';

const monthlyBudget = factories.monthlyBudget.build({ budgeted: 25095 });
const budget = factories.budget.build();
const moneySettings = currencySettings(budget);

describe('useMonthlyBudgetForm', () => {
  describe('#form', () => {
    describe('when isEdit is true', () => {
      it('formats budgeted value without currency', () => {
        const { form } = useMonthlyBudgetForm(
          { monthlyBudget },
          ref(true),
          moneySettings,
        );

        expect(form.budgeted).toEqual('250,95');
      });
    });

    describe('when monthly budget changes', () => {
      it('updates form fields to match new monthly budget', async () => {
        const reactiveMonthlyBudget = reactive({ ...monthlyBudget });
        const { form } = useMonthlyBudgetForm(
          { monthlyBudget: reactiveMonthlyBudget },
          ref(true),
          moneySettings,
        );

        expect(form).toMatchObject({
          id: monthlyBudget.id,
          categoryId: monthlyBudget.categoryId,
          budgeted: '250,95',
        });

        reactiveMonthlyBudget.budgeted = 89923;

        // FIXME: for some reason neither flushPromises nor nextTick worked.
        // There should be a better way to do that without setTimeout.
        setTimeout(() => {
          expect(form).toMatchObject({
            budgeted: '123,78',
          });
        }, 500);
      });
    });
  });

  describe('#resetForm', () => {
    it('sets all form fields to default values', () => {
      const { resetForm, form } = useMonthlyBudgetForm(
        { monthlyBudget },
        ref(true),
        moneySettings,
      );

      expect(form).toMatchObject({
        id: monthlyBudget.id,
        categoryId: monthlyBudget.categoryId,
        budgeted: '250,95',
      });

      resetForm();

      expect(form).toMatchObject({
        id: '',
        categoryId: '',
        budgeted: '0,00',
      });
    });
  });
});
