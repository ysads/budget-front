import { symbolOf } from '@/support/currencies';
import { AccountType, Budget } from '@/types/models';
import { computed, ComputedRef, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';

export interface CreateAccountForm {
  accountName: string;
  accountType: AccountType;
  budgetId: string;
  currentBalance: string;
  payeeName: string;
}

interface CreateAccountFormHook {
  currencySymbol: ComputedRef<string>;
  form: CreateAccountForm;
  resetForm: () => void;
}

interface PropTypes {
  budget: Budget;
}

export default function useCreateAccountForm({
  budget,
}: PropTypes): CreateAccountFormHook {
  const { t } = useI18n();
  const form: CreateAccountForm = reactive({} as CreateAccountForm);
  const currencySymbol = computed(() => symbolOf(budget.currency));

  const resetForm = () => {
    form.accountType = 'checking';
    form.currentBalance = '';
    form.accountName = '';
    form.budgetId = budget.id;
    form.payeeName = t('general.startingBalance');
  };

  watch(budget, resetForm, { immediate: true });

  return { currencySymbol, resetForm, form };
}
