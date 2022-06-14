import baseI18n from '@/i18n';
import { watchEffect } from 'vue';

type BaseI18n = typeof baseI18n.global;

interface UseI18nHook extends BaseI18n {
  st: (path: string) => string;
}

export default function useI18n(scope?: string): UseI18nHook {
  const global = baseI18n.global;

  const st = (path: string) => global.t(`${scope}.${path}`);

  watchEffect(() => {
    const rootTag = document.querySelector('html');

    if (rootTag) {
      rootTag.lang = global.locale;
    }
  });

  return { ...baseI18n.global, st };
}
