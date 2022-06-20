import { openBudget } from '@/repositories/budgets';
import { createTransfer, updateTransfer } from '@/repositories/transfers';
import { Account, NullishDate, Transfer, TransferType } from '@/types/models';
import { computed, reactive, watch, ComputedRef, Ref } from 'vue';
import { getAccountById } from '@/repositories/accounts';
import { ApiTransferMutation } from '@/types/api';
import { useI18n } from 'vue-i18n';
import { CurrencySettings, format } from '@/support/money';

export interface TransferForm {
  amount: string;
  budgetId: string;
  categoryId: string;
  clearedAt: NullishDate;
  destinationId: string;
  id: string | undefined;
  memo: string;
  originId: string;
  originTransactionId: string | undefined;
  destinationTransactionId: string | undefined;
  outflow: boolean;
  type: TransferType;
  referenceAt: Date;
}

interface PropTypes {
  props: { origin?: Account; transaction: Transfer };
  isEdit: Ref<boolean>;
  moneySettings: CurrencySettings;
}

interface TransferFormHook {
  form: TransferForm;
  resetForm: () => void;
  saveForm: (form: ApiTransferMutation) => Promise<void>;
  saveMessage: ComputedRef<string>;
}

export default function useTransferForm({
  props,
  isEdit,
  moneySettings,
}: PropTypes): TransferFormHook {
  const form: TransferForm = reactive({} as TransferForm);

  const updateForm = (newRecord: Transfer): void => {
    form.id = newRecord.id || '';
    form.budgetId = openBudget.value.id;
    form.memo = newRecord.memo || '';
    form.categoryId = newRecord.categoryId || '';
    form.destinationId = newRecord.linkedTransactionAccountId || '';
    form.outflow = newRecord.outflow || true;

    updateOrigin();
    updateTransactionIds(newRecord);

    if (isEdit.value) {
      form.amount = format(newRecord.unsignedAmount, moneySettings, false);
      form.referenceAt = new Date(props.transaction.referenceAt);
      form.clearedAt = newRecord.clearedAt;
    } else {
      form.amount = '';
      form.referenceAt = new Date();
      form.clearedAt = new Date().toISOString();
    }
  };

  const updateTransferType = ([
    newOriginId,
    newDestinationId,
  ]: string[]): void => {
    const origin = getAccountById(newOriginId);
    const destination = getAccountById(newDestinationId);

    if (origin?.isTracking == destination?.isTracking) {
      form.type = 'rebalance';
    } else if (origin?.isTracking && destination?.isBudget) {
      form.type = 'income';
      form.categoryId = '';
    } else {
      form.type = 'spending';
    }
  };

  const updateOrigin = (): void => {
    form.originId = props.transaction.accountId || props.origin?.id || '';
  };

  const updateTransactionIds = (newRecord: Transfer): void => {
    if (!isEdit.value) return;

    /**
     * INFO: needed to know which one of the transactions is the money's source
     * and set the IDs according. This assumes *all* destination transactions are
     * inflows since we can't move negative money between accounts.
     */
    if (newRecord.outflow) {
      form.destinationTransactionId = newRecord.linkedTransactionId;
      form.originTransactionId = newRecord.id;
    } else {
      form.destinationTransactionId = newRecord.id;
      form.originTransactionId = newRecord.linkedTransactionId;
    }
  };

  const { t } = useI18n();
  const saveMessage = computed(() =>
    isEdit.value ? t('general.updated') : t('general.created'),
  );

  const resetForm = () => updateForm({} as Transfer);

  const saveForm = async (params: ApiTransferMutation) => {
    const saveFn = isEdit.value ? updateTransfer : createTransfer;
    await saveFn(params);
  };

  watch(() => props.origin, updateOrigin, { immediate: true });
  watch(() => props.transaction, updateForm, {
    immediate: true,
  });
  watch([() => form.originId, () => form.destinationId], updateTransferType, {
    immediate: true,
  });

  return { form, resetForm, saveForm, saveMessage };
}
