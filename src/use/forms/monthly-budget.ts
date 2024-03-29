import { CurrencySettings, format } from '@/support/money';
import { MonthlyBudget } from '@/types/models';
import { reactive, Ref, watch } from 'vue';

interface MonthlyBudgetForm {
  id: string;
  categoryId: string;
  budgeted: string;
}

interface MonthlyBudgetFormHook {
  resetForm: () => void;
  form: MonthlyBudgetForm;
}

export default function useMonthlyBudgetForm(
  props: { monthlyBudget: MonthlyBudget },
  isEdit: Ref<boolean>,
  moneySettings: CurrencySettings,
): MonthlyBudgetFormHook {
  const form: MonthlyBudgetForm = reactive({} as MonthlyBudgetForm);

  const updateForm = (newRecord: MonthlyBudget): void => {
    form.id = newRecord.id || '';
    form.categoryId = newRecord.categoryId || '';
    form.budgeted = isEdit.value
      ? format(newRecord.budgeted, moneySettings, false)
      : '';
  };

  // INFO: needed so we have the form filled with the monthly budget
  // data received as prop
  watch(() => props.monthlyBudget, updateForm, { immediate: true });

  const resetForm = () => updateForm({} as MonthlyBudget);

  return { resetForm, form };
}
