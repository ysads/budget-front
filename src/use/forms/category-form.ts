import { createCategory } from '@/repositories/categories';
import { Budget } from '@/types/models';
import { computed, ComputedRef, reactive, Ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

export interface CategoryForm {
  budgetId: string;
  id?: string;
  groupName: string;
  name: string;
}

interface CategoryFormHook {
  form: CategoryForm;
  resetForm: () => void;
  saveForm: (form: CategoryForm) => Promise<void>;
  saveMessage: ComputedRef<string>;
}

interface PropTypes {
  budget: Ref<Budget>;
}

export default function useCategoryForm({
  budget,
}: PropTypes): CategoryFormHook {
  const { t } = useI18n();
  const form = reactive({} as CategoryForm);
  const saveMessage = computed(() => t('general.created'));

  const resetForm = () => {
    form.budgetId = budget.value.id;
    form.groupName = '';
    form.name = '';
  };
  const saveForm = createCategory;

  watch(budget, resetForm, { immediate: true });

  return { form, resetForm, saveForm, saveMessage };
}
