import { Budget } from '@/types/models';
import { computed, ComputedRef, reactive, Ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

export interface BudgetForm {
  id?: string;
  currency: string;
  dateFormat: string;
  name: string;
}

interface BudgetFormHook {
  form: BudgetForm;
  resetForm: () => void;
  saveForm: (form: BudgetForm) => void;
  saveMessage: ComputedRef<string>;
}

interface PropTypes {
  budget: Ref<Budget>;
  isEdit: Ref<boolean>;
}

export default function useBudgetForm({
  budget,
  isEdit,
}: PropTypes): BudgetFormHook {
  const { t } = useI18n();
  const form = reactive({} as BudgetForm);
  const saveMessage = computed(() =>
    isEdit.value ? t('general.updated') : t('general.created'),
  );

  const updateForm = (newRecord: Budget) => {
    form.id = newRecord.id || '';
    form.dateFormat = newRecord.dateFormat || '';
    form.currency = newRecord.currency || 'EUR';
    form.name = newRecord.name || '';
  };
  const saveForm = async (form: BudgetForm) => console.log(form);

  // INFO: needed so we have the form filled with the monthly budget
  // data received as prop
  watch(budget, updateForm, { immediate: true });

  const resetForm = () => updateForm({} as Budget);

  return { form, resetForm, saveForm, saveMessage };
}
