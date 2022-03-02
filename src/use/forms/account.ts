import { reactive } from 'vue';
import useI18n from '../i18n';

export default function useAccount({}) {
  const { t } = useI18n();

  const form = reactive({
    accountType: 'checking' as AccountType,
    accountName: '',
    budgetId: props.budget.id,
    currentBalance: '',
    payeeName: t('startingBalance'),
  });
}
