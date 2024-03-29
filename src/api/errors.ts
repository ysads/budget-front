import alert from '@/support/alert';
import { useI18n } from 'vue-i18n';

interface ErrorResponse {
  response?: {
    data?: {
      code: string;
    };
  };
}

export const MAPPED_ERRORS = [
  'accounts/duplicate',
  'categories/duplicate',
  'monthly-budgets/already-exists',
];

export const handleApiError = (err: unknown): void => {
  const { t } = useI18n();

  const errorCode = (err as ErrorResponse).response?.data?.code;

  if (errorCode && MAPPED_ERRORS.includes(errorCode)) {
    const [namespace, type] = errorCode.split('/');

    alert.error(t(`errors.${namespace}.${type}`));
  } else {
    alert.error(t('errors.generic'));
  }
  throw err;
};
