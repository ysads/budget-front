import { openBudget } from '@/repositories/budgets';
import { Account, Transaction } from '@/types/models';
import { computed, reactive, watch, ComputedRef, Ref } from 'vue';
import useI18n from '@/use/i18n';
import { getAccountById } from '@/repositories/accounts';

export interface TransferForm {
  amount: string;
  budgetId: string;
  categoryId: string;
  destinationId: string;
  id: string | undefined;
  memo: string;
  originId: string;
  outflow: boolean;
}

interface PropTypes {
  props: { originAccount?: Account; transaction: Transaction };
  isEdit: Ref<boolean>;
}

interface TransferFormHook {
  form: TransferForm;
  resetForm: () => void;
  saveMessage: ComputedRef<string>;
}

export default function useTransferForm({
  props,
  isEdit,
}: // moneySettings,
PropTypes): TransferFormHook {
  const form: TransferForm = reactive({} as TransferForm);

  const updateForm = (newRecord: Transaction): void => {
    form.id = newRecord.id || '';
    form.budgetId = openBudget.value.id;
    form.memo = newRecord.memo || '';
    form.categoryId = newRecord.categoryId || '';
    form.originId = props.transaction.originId || props.originAccount?.id || '';
    form.destinationId = props.transaction.destinationId || '';
    form.outflow = true;
  };

  const updateCategory = ([newOriginId, newDestinationId]: string[]): void => {
    const origin = getAccountById(newOriginId);
    const destination = getAccountById(newDestinationId);

    if (origin?.isTracking && destination?.isBudget) {
      form.categoryId = '';
    }
  };

  const { t } = useI18n();
  const saveMessage = computed(() =>
    isEdit.value ? t('general.updated') : t('general.created'),
  );

  const resetForm = () => updateForm({} as Transaction);

  watch(() => props.transaction, updateForm, { immediate: true });
  watch([() => form.originId, () => form.destinationId], updateCategory, {
    immediate: true,
  });

  return { form, resetForm, saveMessage };
}
