import { openBudget } from '@/repositories/budgets';
import {
  createTransaction,
  updateTransaction,
} from '@/repositories/transactions';
import { CurrencySettings, format } from '@/support/money';
import { Account, NullishDate, Transaction } from '@/types/models';
import { computed, ComputedRef, reactive, Ref, watch } from 'vue';
import useI18n from '@/use/i18n';

export interface TransactionForm {
  amount: string;
  budgetId: string;
  clearedAt: NullishDate;
  categoryId: string;
  id: string | undefined;
  memo: string;
  accountId: string;
  outflow: boolean;
  payeeName: string;
  referenceAt: Date;
}

export interface ApiTransactionForm extends Omit<TransactionForm, 'amount'> {
  amount: number;
}

interface TransactionFormHook {
  resetForm: () => void;
  form: TransactionForm;
  saveForm: (form: ApiTransactionForm) => Promise<void>;
  saveMessage: ComputedRef<string>;
}

interface PropTypes {
  props: { account?: Account; transaction: Transaction };
  isEdit: Ref<boolean>;
  moneySettings: CurrencySettings;
}

export default function useTransactionForm({
  props,
  isEdit,
  moneySettings,
}: PropTypes): TransactionFormHook {
  const form: TransactionForm = reactive({} as TransactionForm);

  const updateForm = (newRecord: Transaction): void => {
    form.id = newRecord.id || '';
    form.budgetId = openBudget.value.id;
    form.memo = newRecord.memo || '';
    form.categoryId = newRecord.categoryId || '';
    form.outflow = newRecord.outflow ?? true;
    form.payeeName = newRecord.payeeName || '';

    updateAccount();

    if (isEdit.value) {
      form.amount = format(newRecord.unsignedAmount, moneySettings, false);
      form.referenceAt = new Date(props.transaction.referenceAt);
      form.clearedAt = newRecord.clearedAt;
    } else {
      form.amount = '';
      form.referenceAt = new Date();
      form.clearedAt = new Date().toISOString() as NullishDate;
    }
  };

  const updateAccount = (): void => {
    form.accountId = props.transaction.accountId || props.account?.id || '';
  };

  // INFO: make sure that incomes (blank category id) are always inflows
  const updateOutflow = (newCategoryId: string): void => {
    form.outflow = !newCategoryId ? false : form.outflow;
  };

  watch(() => props.account, updateAccount);
  watch(() => props.transaction, updateForm, { immediate: true });
  watch(() => form.categoryId, updateOutflow, { immediate: true });

  const resetForm = () => updateForm({} as Transaction);
  const saveForm = async (params: ApiTransactionForm) => {
    const saveFn = isEdit.value ? updateTransaction : createTransaction;

    await saveFn(params);
  };

  const { t } = useI18n();
  const saveMessage = computed(() =>
    isEdit.value ? t('updated') : t('created'),
  );

  return { saveForm, saveMessage, resetForm, form };
}
