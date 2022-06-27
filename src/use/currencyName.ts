import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export const useCurrencyName = () => {
  const { locale } = useI18n();

  const currencyNameOf = computed(() => {
    const intl = new Intl.DisplayNames([locale.value || 'en'], {
      type: 'currency',
    });
    return intl.of.bind(intl);
  });

  return { currencyNameOf };
};
